import {useMemo, useState } from "react";
import AccordionTable from "../../../components/ui/AccordionTable/AccordionTable";
import useLang from "../../../utils/useLang";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import NavTabs from "../../../components/ui/NavTabs/NavTabs";
import CustomDropdown from "../../../components/common/customDropdown/CustomDropdown";
import { exportToExcel, formatNumber } from "../../../utils/helper";
import { currencies } from "../../../constants/constants";
const Statments = () => {
  
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
  // 3-get financial statements data from useRequest depend on activeTab
  const { data: finincialStatement } = useRequest(
    [`${API_ENDPOINTS.FINANCIAL_STATEMENT.KEY},${activeTab}`],
    `${API_ENDPOINTS.FINANCIAL_STATEMENT.URL}=${activeTab}`
  );
  // function to sorting and slicing array depend on forYears and fiscalPeriodValueID keys
  const sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID = (
    array
  ) => {
    const sortedAndSlicedArray = array?.sort((oldest, newst) => {
      if (oldest.forYear !== newst.forYear) {
        return newst.forYear - oldest.forYear;
      }
      return newst.fiscalPeriod - oldest.fiscalPeriod;
    });
    return sortedAndSlicedArray?.slice(0, 5);
  };
  // 4-get table head data and table body data from api and set theme into tableHeadData and tableBody keys in useState
  const tableData = useMemo(() => {
    if (!finincialStatement) return null;
    const data = finincialStatement.tabs;
    const allYears = [];
    data?.forEach((tab) => {
      tab?.fields?.forEach((field) => {
        field?.values?.forEach((value) => {
          if (
            value?.fiscalPeriod &&
            !allYears.some((year) => year.year === value.fiscalPeriod)
          ) {
            allYears.push({ year: value.fiscalPeriod });
          }
        });
      });
    });
    return {
      tableHeadData:
        sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(allYears),
      tableBodyData: data?.map((item) => ({
        nameEn: item?.tabNameEn,
        nameAr: item?.tabNameAr,
        fields: item?.fields?.map((field) => ({
          fieldNameEn: field?.displayNameEn,
          fieldNameAr: field?.displayNameAr,
          values: sortingAndSlicingArrayDependOnForYearAndFiscalPeriodValueID(
            field?.values
          )?.map((value) => ({
            year: value?.fiscalPeriod,
            value: value?.value,
          })),
        })),
      })),
    };
  }, [finincialStatement]);

  // export to excel
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
    const fileName=`financial-statement-${tableData?.tableHeadData[tableData?.tableHeadData?.length - 1].year}-${tableData?.tableHeadData[0].year}-${useLang("en", "ar")}-${choosenCurrency?.value}.xlsx`;
    await exportToExcel("get-company-financial-statement", formData,fileName);
  };

  return (
    <div className="statements">
      <h2 className="section-title">{useLang("statement", "القوائم")}</h2>
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

export default Statments;
