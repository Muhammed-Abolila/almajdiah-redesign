import CustomTd from "../../../../../components/common/customTd/CustomTd";
import TableRowEmptyComp from "../../../../../components/common/TableRowEmptyComp/TableRowEmptyComp";
import useLang from "../../../../../utils/useLang";
import PrintOptions from "../../../../../components/common/PrintOptions/PrintOptions";
import NavTabs from "../../../../../components/ui/NavTabs/NavTabs";
import CustomDropdown from "../../../../../components/common/customDropdown/CustomDropdown";
import {
  changeCurrencyFromRiyalToDollar,
  formatNumber,
} from "../../../../../utils/helper";
import { currencies } from "../../../../../constants/constants";
import usePeersSelections from "../../../../../hooks/usePeersSelections";
import SkeletonTable from "../../../../../components/ui/SkeletonTable/SkeletonTable";
const SalariesBenefits = () => {
  const customTabs = [
    {
      label: useLang("annual", "سنوي"),
      tab: "annual",
    },
  ];
  const {
    PeriodTabs,
    activeTab,
    setActiveTab,
    choosedYear,
    setChoosedYear,
    allYears,
    choosenCurrency,
    setChoosenCurrency,
    handleExportToExcel,
    data,
    isLoading,
  } = usePeersSelections("salariesandbonuses", customTabs);
  const tableHeaders = [
    { title: useLang("salaries", "الرواتب") },
    { title: useLang("bonus", "المكافأت") },
    { title: useLang("other", "أخرى") },
    { title: useLang("total", "الإجمالي") },
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
                  <th
                    style={{
                      ...useLang(
                        { borderRight: "1px solid var(--border-color)" },
                        { borderLeft: "1px solid var(--border-color)" }
                      ),
                    }}
                    className="fw-medium px-2"
                    rowSpan="2"
                  >
                    {useLang("company", "الشركة")}
                  </th>
                  <th
                    colSpan="4"
                    className=" fw-medium text-center py-2"
                    style={{
                      borderRight: "1px solid var(--border-color)",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    {useLang("board", "مكافأت مجلس الإدارة")}
                  </th>
                  <th
                    colSpan="4"
                    className=" fw-medium text-center py-2"
                    style={{
                      borderLeft: "1px solid var(--border-color)",
                      borderRight: "1px solid var(--border-color)",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    {useLang("executives", "مكافأت كبار التنفيذيين")}
                  </th>
                  <th rowSpan="2" className=" fw-medium text-center px-2">
                    {useLang("total", "الإجمالي")}
                  </th>
                </tr>

                <tr>
                  {tableHeaders?.map((item, idx) => (
                    <th
                      key={idx}
                      className=" fw-medium py-2 text-center"
                      style={
                        idx === 3
                          ? useLang(
                            { borderRight: "1px solid var(--border-color)" },
                            { borderLeft: "1px solid var(--border-color)" }
                          )
                          : {}
                      }
                    >
                      {item?.title}
                    </th>
                  ))}

                  {tableHeaders?.map((item, idx) => (
                    <th
                      key={idx}
                      className=" fw-medium py-2 text-center"
                      style={
                        idx === 3
                          ? useLang(
                            { borderRight: "1px solid var(--border-color)" },
                            { borderLeft: "1px solid var(--border-color)" }
                          )
                          : {}
                      }
                    >
                      {item?.title}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* <tbody>
                {data?.SalariesAndBonuses?.length > 0 ? (
                  <>
                    {data?.SalariesAndBonuses?.map((item, idx) => (
                      <tr key={idx}>
                        <CustomTd
                          textCenter={false}
                          label={useLang(item?.shortNameEn, item?.shortNameAr)}
                          style={useLang(
                            { borderRight: "1px solid var(--border-color)" },
                            { borderLeft: "1px solid var(--border-color)" }
                          )}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.boardMemberSalaries) : formatNumber(changeCurrencyFromRiyalToDollar(item?.boardMemberSalaries))}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.boardMemberBonus) : formatNumber(changeCurrencyFromRiyalToDollar(item?.boardMemberBonus))}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.boardMemberOther) : formatNumber(changeCurrencyFromRiyalToDollar(item?.boardMemberOther))}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.boardMemberSalariesTotal) : formatNumber(changeCurrencyFromRiyalToDollar(item?.boardMemberSalariesTotal))}
                          style={useLang(
                            { borderRight: "1px solid var(--border-color)" },
                            { borderLeft: "1px solid var(--border-color)" }
                          )}
                        />
                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.executiveSalaries) : formatNumber(changeCurrencyFromRiyalToDollar(item?.executiveSalaries))}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.executiveBonus) : formatNumber(changeCurrencyFromRiyalToDollar(item?.executiveBonus))}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.executiveOther) : formatNumber(changeCurrencyFromRiyalToDollar(item?.executiveOther))}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.executiveSalariesTotal) : formatNumber(changeCurrencyFromRiyalToDollar(item?.executiveSalariesTotal))}
                          style={useLang(
                            { borderRight: "1px solid var(--border-color)" },
                            { borderLeft: "1px solid var(--border-color)" }
                          )}
                        />

                        <CustomTd
                          label={choosenCurrency?.value == "riyal" ? formatNumber(item?.total) : formatNumber(changeCurrencyFromRiyalToDollar(item?.total))}
                        />
                      </tr>
                    ))}
                  </>
                ) : (
                  <TableRowEmptyComp
                    text={useLang("no data available", " لا توجد بيانات متوفره")}
                    colspan="10"
                  />
                )}
              </tbody> */}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalariesBenefits;
