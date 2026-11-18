import CustomTd from "../../../../../components/common/customTd/CustomTd";
import { API_ENDPOINTS } from "../../../../../services/apis";
import useLang from "../../../../../utils/useLang";
import useRequest from "../../../../../utils/useRequest";
import { useState } from "react";
import {
  colorAndBgColorDependOnNumber,
  formatDate,
  formatNumber,
} from "../../../../../utils/helper";
import TableRowEmptyComp from "../../../../../components/common/TableRowEmptyComp/TableRowEmptyComp";
import PrintOptions from "../../../../../components/common/PrintOptions/PrintOptions";
import DatePicker from "react-datepicker";
import SkeletonTable from "../../../../../components/ui/SkeletonTable/SkeletonTable";
const StockInfo = () => {
  const [dateRange, setDateRange] = useState([
    new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;
  // get share performance table data from useRequest
  const { data: sharePerformanceTableData, isLoading } = useRequest(
    [`${API_ENDPOINTS.SHARE_PERFORMANCE_TEBLE.KEY},${startDate},${endDate}`],
    `${API_ENDPOINTS.SHARE_PERFORMANCE_TEBLE.URL}/${formatDate(startDate, "YYYY-MM-DD")}/${formatDate(endDate, "YYYY-MM-DD")}`,
    { enabled: endDate != null }
  );
  const tableHeaders = [
    { title: useLang("date", "التاريخ") },
    { title: useLang("Price", "السعر") },
    { title: useLang("Change", "التغير") },
    { title: useLang("Change (%)", "التغير (%)") },
    { title: useLang("Volume", "حجم التداول") },
    { title: useLang("Turnover", "قيمة التداول") },
    { title: useLang("Open", "الافتتاح") },
    { title: useLang("High", "الأعلى") },
    { title: useLang("Low", "الأدنى") },
  ];

  return (
    <div className="space-between-sections">
      <div className="row align-items-center m-0 mb-4 row-gap-3">
        <h2 className="section-title col-12 col-lg-5 col-xxl-4">
          {useLang("historical performance", "بيانات التداول التاريخية")}
        </h2>
        <div className="col-10 col-lg-5 col-xxl-6 d-flex justify-content-start align-items-center">
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            dateFormat="dd/MM/yyyy"
            selectsRange
            isClearable
          />
        </div>
        <div className="col-2 ">
          <PrintOptions excel={false} link={`https://www.argaam.com/en/company-chart/marketid/3?companyid=${API_ENDPOINTS?.COMPANY_ID}&fromdate=${formatDate(startDate, "YYYY-MM-DD")}&todate=${formatDate(endDate, "YYYY-MM-DD")}`} />
        </div>
      </div>

      <div>
        {isLoading ? <SkeletonTable /> :
          <div className="table-responsive">
            <table
              className="print-table-wrapper w-100 fs-6"
              style={{ minWidth: "900px" }}
            >
              <thead
                style={{
                  backgroundColor: "var(--identity-color) !important",
                  color: "var(--white-color)",
                }}
              >
                <tr className="text-capitalize">
                  {tableHeaders.map((item, idx) => (
                    <CustomTd
                      key={idx}
                      textCenter={idx != 0}
                      label={item.title}
                      style={{ minWidth: `${idx == 0 && "100px"}` }}
                    />
                  ))}
                </tr>
              </thead>

              <tbody>
                {sharePerformanceTableData?.chartsData?.length > 0 ? (
                  <>
                    {sharePerformanceTableData?.chartsData
                      ?.reverse()
                      .map((item, idx) => (
                        <tr key={idx} style={{ color: "var(--second-black-color)" }}>
                          <CustomTd
                            textCenter={false}
                            label={formatDate(item?.forDate, useLang("DD/MM/YYYY", "YYYY/DD/MM"))}
                          />
                          <CustomTd
                            style={{
                              color: colorAndBgColorDependOnNumber(item?.close),
                            }}
                            label={formatNumber(item?.close)}
                          />
                          <CustomTd
                            style={{
                              color: colorAndBgColorDependOnNumber(item?.change),
                            }}
                            label={formatNumber(item?.change)}
                          />
                          <CustomTd
                            style={{
                              color: colorAndBgColorDependOnNumber(
                                item?.percentageChange
                              ),
                            }}
                            label={`${formatNumber(item?.percentageChange)} %`}
                          />

                          <CustomTd label={formatNumber(item?.volume, 0, "-")} />
                          <CustomTd label={formatNumber(item?.amount, 0, "-")} />

                          <CustomTd
                            style={{
                              color: colorAndBgColorDependOnNumber(item?.open),
                            }}
                            label={formatNumber(item?.open)}
                          />
                          <CustomTd
                            style={{
                              color: colorAndBgColorDependOnNumber(item?.max),
                            }}
                            label={formatNumber(item?.max)}
                          />
                          <CustomTd
                            style={{
                              color: colorAndBgColorDependOnNumber(item?.min),
                            }}
                            label={formatNumber(item?.min)}
                          />
                        </tr>
                      ))}
                  </>
                ) : (
                  <TableRowEmptyComp
                    text={useLang("no data available", " لا توجد بيانات متوفره")}
                    colspan="9"
                  />
                )}
              </tbody>
            </table>
          </div>
        }

      </div>
    </div>
  );
};

export default StockInfo;
