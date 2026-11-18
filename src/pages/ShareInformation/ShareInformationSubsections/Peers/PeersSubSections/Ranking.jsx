import CustomTd from "../../../../../components/common/customTd/CustomTd";
import TableRowEmptyComp from "../../../../../components/common/TableRowEmptyComp/TableRowEmptyComp";
import useLang from "../../../../../utils/useLang";
import PrintOptions from "../../../../../components/common/PrintOptions/PrintOptions";
import NavTabs from "../../../../../components/ui/NavTabs/NavTabs";
import CustomDropdown from "../../../../../components/common/customDropdown/CustomDropdown";
import {
  changeCurrencyFromRiyalToDollar,
  colorAndBgColorDependOnNumber,
  formatNumber,
} from "../../../../../utils/helper";
import { currencies } from "../../../../../constants/constants";
import usePeersSelections from "../../../../../hooks/usePeersSelections";
import SkeletonTable from "../../../../../components/ui/SkeletonTable/SkeletonTable";
const Ranking = () => {
  const {
    PeriodTabs,
    activeTab,
    setActiveTab,
    activeQuarter,
    quarters,
    setActiveQuarter,
    activeInterim,
    interims,
    setActiveInterim,
    choosedYear,
    setChoosedYear,
    allYears,
    choosenCurrency,
    setChoosenCurrency,
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("ranking");

  const tableHeaders = [
    { title: useLang("company", "الشركة") },
    { title: useLang("argaam sector", "قطاع أرقام") },
    { title: useLang("market cap (M)", "القيمة السوقية (مليون)") },
    { title: useLang("revenues", "الإيرادات") },
    { title: useLang("net income", "صافي الدخي") },
    { title: useLang("assets", "الأصول") },
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

              {/* interim dropdown */}
              {activeTab == "interim" && (
                <CustomDropdown
                  selectedItem={activeInterim}
                  list={interims}
                  onClick={(val) => setActiveInterim(val)}
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
                  <i className="bi bi-chevron-down" />
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

              {/* currencies dropdown */}
              <CustomDropdown
                selectedItem={choosenCurrency}
                list={currencies}
                onClick={(value) => setChoosenCurrency(value)}
              />
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
                {data?.Total?.sumOfMarketValue == 0 &&
                  data?.Total?.sumOfNetIncome == 0 &&
                  data?.Total?.sumOfRevenue == 0 &&
                  data?.Total?.sumOfTotalAssets == 0 ? (
                  <TableRowEmptyComp
                    text={useLang("no data available", " لا توجد بيانات متوفره")}
                    colspan="6"
                  />
                ) : (
                  <>
                    {data?.Ranking?.map((item, idx) => (
                      <tr key={idx} style={{ color: "var(--second-black-color)" }}>
                        <CustomTd
                          textCenter={false}
                          label={useLang(item?.shortNameEn, item?.shortNameAr)}
                        />
                        <CustomTd
                          label={useLang(
                            item?.argaamSectorNameEn,
                            item?.argaamSectorNameAr
                          )}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.marketValue),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.marketValue) : formatNumber(changeCurrencyFromRiyalToDollar(item?.marketValue))}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.revenues),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.revenues) : formatNumber(changeCurrencyFromRiyalToDollar(item?.revenues))}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(item?.netIncome),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.netIncome) : formatNumber(changeCurrencyFromRiyalToDollar(item?.netIncome))}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.currentTotalAssets
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.currentTotalAssets) : formatNumber(changeCurrencyFromRiyalToDollar(item?.currentTotalAssets))}
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

export default Ranking;
