import { useMemo, useState } from "react";
import useLang from "../../utils/useLang";
import useRequest from "../../utils/useRequest";
import { API_ENDPOINTS } from "../../services/apis";
import AccordionTable from "../../components/ui/AccordionTable/AccordionTable";
import CustomDropdown from "../../components/common/customDropdown/CustomDropdown";
import { currencies } from "../../constants/constants";
import { exportToExcel } from "../../utils/helper";
const BusinessSegments = () => {
  // 1-create useState to set and get currency activeTab
  const [choosenCurrency, setChoosenCurrency] = useState({
    labelEn: "riyal",
    labelAr: "ريال سعودي",
    value: "riyal",
  });
  // 3-get business segments data from useRequest depend on activeTab
  const { data: businessSegmentsData, isLoading } = useRequest(
    [API_ENDPOINTS.BUSINESS_SEGMENTS.KEY],
    `${API_ENDPOINTS.BUSINESS_SEGMENTS.URL}=year`
  );
  const tableData = useMemo(() => {
    if (!businessSegmentsData?.fsFields) {
      return {
        tableHeadData: [],
        tableBodyData: [],
      };
    }
    const allYears = [];
    businessSegmentsData?.fsFields?.forEach((field) => {
      field?.businessSegments?.forEach((segment) => {
        segment?.periodicValues?.forEach((value) => {
          if (
            value?.forDate &&
            !allYears.some((year) => year.year === value.forDate)
          ) {
            allYears.push({ year: value.forDate });
          }
        });
      });
    });
    const lastFiveYears = allYears
      .sort((oldest, newest) => newest.year - oldest.year)
      .slice(0, 5);
    return {
      tableHeadData: lastFiveYears,
      tableBodyData: businessSegmentsData?.fsFields?.map((field) => ({
        nameEn: field?.fsFieldNameEn,
        nameAr: field?.fsFieldNameAr,
        fields: field?.businessSegments?.map((segment) => ({
          fieldNameEn: segment?.businessSegmentNameEn,
          fieldNameAr: segment?.businessSegmentNameAr,
          values: lastFiveYears?.map((year) => {
            const exactYear = segment?.periodicValues.find(
              (value) => value?.forDate == year?.year
            );
            return {
              year: exactYear?.forDate,
              value:exactYear?.value,
            };
          }),
        })),
      })),
    };
  }, [businessSegmentsData]);
    const handleExportToExcel = async () => {
    const formData = {
      languageId: useLang(2, 1),
      fromYear:
        tableData?.tableHeadData[tableData?.tableHeadData?.length - 1].year,
      toYear: tableData?.tableHeadData[0].year,
      currencyId: choosenCurrency?.value == "riyal" ? 3 : 10,
    };
    const fileName=`business-segment-${tableData?.tableHeadData[tableData?.tableHeadData?.length - 1].year}-${tableData?.tableHeadData[0].year}-${useLang("en", "ar")}-${choosenCurrency?.value}.xlsx`;
    await exportToExcel("get-business-segment", formData,fileName);
  };
  return (
    <section className="business-segments container space-between-sections">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h2 className="section-title">{useLang("al-majdiah", "الماجدية")}</h2>
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
        loading={isLoading}
      />
    </section>
  );
};
export default BusinessSegments;
