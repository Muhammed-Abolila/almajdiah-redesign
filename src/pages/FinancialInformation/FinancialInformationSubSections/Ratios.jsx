import { useMemo, useState } from "react";
import { exportToExcel } from "../../../utils/helper";
import useLang from "../../../utils/useLang";
import { API_ENDPOINTS } from "../../../services/apis";
import useRequest from "../../../utils/useRequest";
import AccordionTable from "../../../components/ui/AccordionTable/AccordionTable";
import NavTabs from "../../../components/ui/NavTabs/NavTabs";
import CustomDropdown from "../../../components/common/customDropdown/CustomDropdown";
import { currencies } from "../../../constants/constants";
const Ratios = () => {
  // 1-create useState to set and get currency activeTab
  const [choosenCurrency, setChoosenCurrency] = useState({
    labelEn: "riyal",
    labelAr: "ريال سعودي",
    value: "riyal",
  });
  const [activeTab, setActiveTab] = useState("annual");
  const PeriodTabs = [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
    {
      label: useLang("quarter", "ربعي"),
      tab: "quarter",
    },
    {
      label: useLang("interim", "مرحلي"),
      tab: "interim",
    },
  ];
  // 3-get financial ratio data from useRequest depend on activeTab
  const { data: finincialRatiosData } = useRequest(
    [`${API_ENDPOINTS.FINANCIAL_RATIOS.KEY},${activeTab == "annual" ? "year" : activeTab}`],
    `${API_ENDPOINTS.FINANCIAL_RATIOS.URL}=${activeTab == "annual" ? "year" : activeTab}`
  );
  const tableData = useMemo(() => {
    if (!finincialRatiosData?.financialRatioFieldsGroups) return null;
    const allYears = [];
    finincialRatiosData?.financialRatioFieldsGroups?.forEach((group) => {
      group?.financialRatioFieldsGroupFields?.forEach((field) => {
        field?.values?.forEach((value) => {
          if (
            value?.year &&
            !allYears.some(
              (year) => year.year === value.year && year.period === value.period
            )
          ) {
            allYears.push({ year: value.year, period: value?.period });
          }
        });
      });
    });
    const lastFiveYears = allYears
      .sort((a, b) => b.year - a.year)
      .slice(0, 5);
    return {
      tableHeadData: lastFiveYears,
      tableBodyData: finincialRatiosData?.financialRatioFieldsGroups?.map(
        (group) => ({
          nameEn: group?.fieldGroupEn,
          nameAr: group?.fieldGroupAr,
          fields: group?.financialRatioFieldsGroupFields?.map((field) => ({
            fieldNameEn: field?.nameEn,
            fieldNameAr: field?.nameAr,
            values: lastFiveYears.map((year) => {
              const exactYear = field?.values.find(
                (value) =>
                  value?.year == year?.year && value?.period == year?.period
              );
              return {
                year:
                  exactYear?.period == "-"
                    ? Number(exactYear?.year)
                    : exactYear?.period,
                isRatios: true,
                sarValue: exactYear?.sarValue,
                usdValue: exactYear?.usdValue
              };
            }),
          })),
        })
      ),
    };
  }, [finincialRatiosData, choosenCurrency]);

  const handleExportToExcel = async () => {
    const formData = {
      languageId: useLang(2, 1),
      fromYear:
        tableData?.tableHeadData[tableData?.tableHeadData?.length - 1].year,
      toYear: tableData?.tableHeadData[0].year,
      isYearly: activeTab == "annual",
      isQuarterly: activeTab == "quarter",
      isInterm: activeTab == "interim",
      currencyId: choosenCurrency?.value == "riyal" ? 3 : 10,
    };
    const fileName = `financial-ratios-${tableData?.tableHeadData[tableData?.tableHeadData?.length - 1].year}-${tableData?.tableHeadData[0].year}-${useLang("en", "ar")}-${choosenCurrency?.value}.xlsx`;
    await exportToExcel("get-company-financial-ratios", formData, fileName);
  };
  return (
    <div className="ratios">
      <h2 className="section-title">{useLang("ratios", "المؤشرات")}</h2>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <NavTabs
          tabs={PeriodTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <CustomDropdown
          selectedItem={choosenCurrency}
          list={currencies}
          onClick={(value) => setChoosenCurrency(value)}
        />
      </div>
      <AccordionTable
        accordionTableData={tableData}
        handleExportToExcel={handleExportToExcel}
        currencyActiveTab={choosenCurrency}
      />
    </div>
  );
};

export default Ratios;
