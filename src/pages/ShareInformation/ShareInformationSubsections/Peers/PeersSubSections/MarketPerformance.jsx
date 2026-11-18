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

const MarketPerformance = () => {
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
  } = usePeersSelections("marketperformance");
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
                className="text-capitalize"
                style={{
                  backgroundColor: "var(--identity-color) !important",
                  color: "var(--white-color)",
                }}
              >
                <tr className="p-5 m-5">
                  <td
                    className="px-2 fw-medium"
                    rowSpan="2"
                  >
                    {useLang("company", "الشركة")}
                  </td>

                  <th rowSpan="2" className="text-center py-2 fw-medium">
                    {useLang("market cap (M)", "القيمة السوقية (مليون)")}
                  </th>

                  <th
                    colSpan="5"
                    className="text-center py-2 fw-medium"
                    style={{
                      border: "1px solid var(--border-color)",
                      borderTop: "none",
                    }}
                  >
                    {useLang("change %", "% التغيير")}
                  </th>

                  <th rowSpan="2" className="text-center px-2 fw-medium">
                    {useLang("P/E (TTM)", "مكرر أرباح (آخر 12)")}
                  </th>

                  <th rowSpan="2" className="text-center px-2 fw-medium">
                    {useLang("price/book", "مضاعف القيمة الدفترية")}
                  </th>

                  <th rowSpan="2" className="text-center px-2 fw-medium">
                    {useLang("dividene yield", "عائد التوزيع النقدي")}
                  </th>
                </tr>

                <tr>
                  <th
                    className="text-center py-2 fw-medium"
                    style={useLang(
                      { borderLeft: "1px solid var(--border-color)" },
                      { borderRight: "1px solid var(--border-color)" }
                    )}
                  >
                    {useLang("month", "شهر")}
                  </th>
                  <th className="text-center py-2 fw-medium">
                    {useLang("3 months", "3 شهور")}
                  </th>
                  <th className="text-center py-2 fw-medium">
                    {useLang("6 months", "6 شهور")}
                  </th>
                  <th className="text-center py-2 fw-medium">
                    {useLang("12 months", "12 شهر")}
                  </th>
                  <th
                    className="text-center py-2 fw-medium"
                    style={useLang(
                      { borderRight: "1px solid var(--border-color)" },
                      { borderLeft: "1px solid var(--border-color)" }
                    )}
                  >
                    {useLang("YTD", "التغير من بداية السنة")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.Average?.avgOfDividendYield == 0 &&
                  data?.Average?.avgOfPriceEarnings == 0 &&
                  data?.Average?.avgOfPricePerBook == 0 ? (
                  <TableRowEmptyComp
                    text={useLang("no data available", " لا توجد بيانات متوفره")}
                    colspan="10"
                  />
                ) : (
                  <>
                    {data?.MarketPerformance?.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{ color: "var(--second-black-color)" }}
                      >
                        <CustomTd
                          textCenter={false}
                          label={useLang(item?.shortNameEn, item?.shortNameAr)}
                        />
                        <CustomTd label={formatNumber(item?.marketValue)} />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.month1Change
                            ),
                            ...useLang(
                              { borderLeft: "1px solid var(--border-color)" },
                              { borderRight: "1px solid var(--border-color)" }
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.month1Change) : formatNumber(changeCurrencyFromRiyalToDollar(item?.month1Change))}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.month3Change
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.month3Change) : formatNumber(changeCurrencyFromRiyalToDollar(item?.month3Change))}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.month6Change
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.month6Change) : formatNumber(changeCurrencyFromRiyalToDollar(item?.month6Change))}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.month12Change
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.month12Change) : formatNumber(changeCurrencyFromRiyalToDollar(item?.month12Change))}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.month1Change
                            ),
                            ...useLang(
                              { borderRight: "1px solid var(--border-color)" },
                              { borderLeft: "1px solid var(--border-color)" }
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.ytdChange) : formatNumber(changeCurrencyFromRiyalToDollar(item?.ytdChange))}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.priceEarnings
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.priceEarnings) : formatNumber(changeCurrencyFromRiyalToDollar(item?.priceEarnings))}
                        />

                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.pricePerBook
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.pricePerBook) : formatNumber(changeCurrencyFromRiyalToDollar(item?.pricePerBook))}
                        />
                        <CustomTd
                          style={{
                            color: colorAndBgColorDependOnNumber(
                              item?.dividendYield
                            ),
                          }}
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.dividendYield) : formatNumber(changeCurrencyFromRiyalToDollar(item?.dividendYield))}
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

export default MarketPerformance;
