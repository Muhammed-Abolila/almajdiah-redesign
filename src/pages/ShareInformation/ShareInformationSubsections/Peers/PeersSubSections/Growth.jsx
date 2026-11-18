import CustomTd from "../../../../../components/common/customTd/CustomTd";
import TableRowEmptyComp from "../../../../../components/common/TableRowEmptyComp/TableRowEmptyComp";
import useLang from "../../../../../utils/useLang";
import PrintOptions from "../../../../../components/common/PrintOptions/PrintOptions";
import NavTabs from "../../../../../components/ui/NavTabs/NavTabs";
import CustomDropdown from "../../../../../components/common/customDropdown/CustomDropdown";
import {
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../../../utils/helper";
import usePeersSelections from "../../../../../hooks/usePeersSelections";
import SkeletonTable from "../../../../../components/ui/SkeletonTable/SkeletonTable";
const Growth = () => {
  const customTabs = [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
    {
      label: useLang("quarter", "ربعي"),
      tab: "quarter",
    },
  ];
  const {
    PeriodTabs,
    activeTab,
    setActiveTab,
    activeQuarter,
    quarters,
    setActiveQuarter,
    choosedYear,
    setChoosedYear,
    allYears,
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("growth", customTabs);
  const tableHeaders = [
    { title: useLang("company", "الشركة") },
    { title: useLang("assets", "الأصول") },
    { title: useLang("net income", "صافي الدخل") },
    { title: useLang("revenues", "الإيرادات") },
    { title: useLang("book value (BV)", "القيمة الدفترية") },
  ];
  return (
    <div className="mt-5">
      <div className="row row-gap-5">
        <div className="col-12 col-md-4">
          <NavTabs
            tabs={PeriodTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center justify-content-between justify-content-md-end flex-wrap row-gap-4 column-gap-3">
            <div className="dropdowns-container d-flex gap-2" dir="ltr">
              {/* quarters dropdown */}
              {activeTab == "quarter" && (
                <CustomDropdown
                  selectedItem={activeQuarter}
                  list={quarters}
                  onClick={(val) => setActiveQuarter(val)}
                />
              )}

              {/* years dropdown */}
              <div className="custom-dropdown dropdown">
                <button
                  className="btn dropdown-toggle d-flex justify-content-center align-items-center gap-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    width: "fit-content",
                    minWidth: "85px",
                    borderRadius: "50px",
                    backgroundColor: "var(--second-black-color)",
                    color: "var(--white-color)",
                    height: "35px",
                  }}
                >
                  <span className="text-capitalize">{choosedYear}</span>
                  <i className="bi bi-chevron-down"></i>
                </button>

                <ul
                  className="dropdown-menu"
                  style={{
                    backgroundColor: "var(--second-black-color)",
                    padding: "10px 5px",
                  }}
                >
                  {allYears.map((item) => {
                    const isActive = choosedYear === item;
                    return (
                      <li
                        key={item}
                        className={`dropdown-item ${useLang(
                          "text-start",
                          "text-end"
                        )} cursor-pointer text-capitalize ${isActive ? "disabled" : ""
                          }`}
                        style={{ opacity: isActive ? "0.5" : "1" }}
                        onClick={() => !isActive && setChoosedYear(item)}
                      >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div
              className={`print-options-container align-content-center ${useLang(
                "ms-auto",
                "me-auto"
              )} m-md-0`}
            >
              <PrintOptions excelFun={handleExportToExcel} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 mt-md-5">
        {isLoading ? (
          <SkeletonTable columns={1} rows={5} />
        ) : (
          <div className="table-responsive">
            <table
              className="print-table-wrapper w-100 fs-6"
              style={{ minWidth: "1100px" }}
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
                    />
                  ))}
                </tr>
              </thead>

              <tbody>
                {data?.Average?.avgOfAssets == 0 &&
                  data?.Average?.avgOfBookValue == 0 &&
                  data?.Average?.avgOfNetIncome == 0 &&
                  data?.Average?.avgOfRevenue == 0 ? (
                  <TableRowEmptyComp
                    text={useLang("no data available", " لا توجد بيانات متوفره")}
                    colspan="5"
                  />
                ) : (
                  <>
                    {data?.Growth?.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{ color: "var(--second-black-color)" }}
                      >
                        <CustomTd
                          textCenter={false}
                          label={useLang(item?.shortNameEn, item?.shortNameAr)}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.assets),
                          }}
                          label={`${formatNumber(item?.assets)} %`}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.netIncome),
                          }}
                          label={`${formatNumber(item?.netIncome)} %`}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.revenue),
                          }}
                          label={`${formatNumber(item?.revenue)} %`}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.bookValue),
                          }}
                          label={`${formatNumber(item?.bookValue)} %`}
                        />
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Growth;
