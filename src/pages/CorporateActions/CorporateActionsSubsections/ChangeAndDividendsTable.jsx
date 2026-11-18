import { useState } from "react";
import NavTabs from "../../../components/ui/NavTabs/NavTabs";
import useLang from "../../../utils/useLang";
import CustomTd from "../../../components/common/customTd/CustomTd";
import { formatDate, formatNumber } from "../../../utils/helper";
import { Link } from "react-router";
import TableRowEmptyComp from "../../../components/common/TableRowEmptyComp/TableRowEmptyComp";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";
const ChangeAndDividendsTable = ({
  isLoading,
  divedividendHistoryData,
  capitalHistoryData
}) => {
  const lang = useLang("en", "ar");
  const [activeTab, setActiveTab] = useState("capital");
  const tabs = [
    {
      label: useLang("capital changes", "تطور رأس المال"),
      tab: "capital",
    },
    {
      label: useLang("dividends history", "تطور التوزيعات النقدية"),
      tab: "dividends",
    },
  ];
  const dividendsHistoryTableHeaders = [
    { title: useLang("announcement", "تاريخ الإعلان") },
    { title: useLang("Ex-Dividend", "تاريخ الإستحقاق") },
    { title: useLang("Payment", "تاريخ التوزيع") },
    {
      title: useLang(
        "Dividends (M Riyal)",
        "إجمالي التوزيعات النقدية (مليون ريال)"
      ),
    },
    { title: useLang("Dividends", "التوزيع النقدي") },
    { title: useLang("Notes", "ملاحظات") },
  ];

  const capitalChangesTableHeader = [
    { title: useLang("Date", "التاريخ") },
    { title: useLang("Type", "النوع") },
    { title: useLang("Capital (M Riyal)", "رأس المال (مليون ريال)") },
    { title: useLang("Shares (M)", "عدد الأسهم (مليون سهم)") },
    { title: useLang("Capital (M Riyal)", "رأس المال (مليون ريال)") },
    { title: useLang("Shares (M)", "عدد الأسهم (مليون سهم)") },
    { title: useLang("Change (%)", "معدل التغير (%)") },
    { title: useLang("Notes", "ملاحظات") },
    { title: useLang("Link", "رابط") },
  ];
  return (
    <div className="space-between-sections">
      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-5">
        {isLoading ? (
          <SkeletonTable columns={4} rows={3} />
        ) : (
          <>
            {activeTab == "capital" ? (
              <div className="overflow-auto">
                <table className="w-100 fs-6" style={{ minWidth: "1000px" }}>
                  <thead
                    style={{
                      backgroundColor: "var(--identity-color) !important",
                      color: "var(--white-color)",
                    }}
                  >
                    <tr className="text-capitalize">
                      {capitalChangesTableHeader?.map((item, idx) => (
                        <CustomTd
                          key={idx}
                          textCenter={idx != 0}
                          label={item.title}
                          style={{ minWidth: `${idx == 0 && "150px"}` }}
                        />
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {capitalHistoryData && capitalHistoryData?.length > 0 ? (
                      <>
                        {capitalHistoryData?.map((item, idx) => (
                          <tr
                            key={idx}
                            style={{ color: "var(--second-black-color)" }}
                          >
                            <CustomTd
                              textCenter={false}
                              label={formatDate(item?.tableDate, "DD/MM/YYYY")}
                            />
                            <CustomTd
                              label={useLang(item?.typeEn, item?.typeAr)}
                            />
                            <CustomTd
                              label={formatNumber(item?.currentCapital)}
                            />
                            <CustomTd
                              label={formatNumber(item?.currentShares)}
                            />
                            <CustomTd label={formatNumber(item?.newCapital)} />
                            <CustomTd label={formatNumber(item?.newShares)} />
                            <CustomTd
                              label={`${formatNumber(item?.offeredPercentage)} %`}
                            />
                            <td className="text-center">
                              {lang === "en" ? (
                                item?.notesEn ? (
                                  <>
                                    <i className="bi bi-journal-text icons-color fw-bold custom-fs-5"></i>
                                    {item?.notesEn}
                                  </>
                                ) : (
                                  "-"
                                )
                              ) : lang === "ar" ? (
                                item?.notesAr ? (
                                  <>
                                    <i className="bi bi-journal-text icons-color fw-bold custom-fs-5"></i>
                                    {item?.notesAr}
                                  </>
                                ) : (
                                  "-"
                                )
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="text-center">
                              <Link
                                to={useLang(
                                  item?.conditionalLinkEn,
                                  item?.conditionalLinkAr
                                )}
                                target="_blank"
                                className="text-transparent "
                                style={{
                                  fontSize: "20px",
                                  color: "var(--identity-color)",
                                }}
                              >
                                <i className="bi bi-link-45deg"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <TableRowEmptyComp
                        text={useLang(
                          "data not available",
                          "البيانات غير متوفرة"
                        )}
                        colspan={9}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="w-100 fs-6" style={{ minWidth: "900px" }}>
                  <thead
                    style={{
                      backgroundColor: "var(--identity-color) !important",
                      color: "var(--white-color)",
                    }}
                  >
                    <tr className="text-capitalize">
                      {dividendsHistoryTableHeaders?.map((item, idx) => (
                        <CustomTd
                          key={idx}
                          textCenter={idx != 0}
                          label={item?.title}
                          style={{ minWidth: `${idx == 0 && "200px"}` }}
                        />
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {divedividendHistoryData &&
                    divedividendHistoryData?.length > 0 ? (
                      <>
                        {divedividendHistoryData?.map((item, idx) => (
                          <tr key={idx}>
                            <CustomTd
                              textCenter={false}
                              label={formatDate(
                                item?.dividendAnnouncedDate,
                                "DD/MM/YYYY"
                              )}
                            />
                            <CustomTd
                              label={formatDate(
                                item?.dividendDueDate,
                                "DD/MM/YYYY"
                              )}
                            />
                            <CustomTd
                              label={formatDate(
                                item?.dividendDate,
                                "DD/MM/YYYY"
                              )}
                            />
                            <CustomTd
                              label={formatNumber(item?.cashDividend)}
                            />
                            <CustomTd
                              label={formatNumber(item?.cashDividendPerShare)}
                            />
                            <td
                              className="text-center cursor-pointer"
                              data-bs-toggle="tooltip"
                              title={useLang(item?.notesEn, item?.notesAr)}
                              data-bs-original-title={useLang(
                                item?.notesEn,
                                item?.notesAr
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26.751"
                                height="20"
                                viewBox="0 0 26.751 34.36"
                              >
                                <path
                                  id="Icon_awesome-file-alt"
                                  data-name="Icon awesome-file-alt"
                                  d="M15.6,9.127V0H1.672A1.638,1.638,0,0,0,0,1.611V32.75a1.638,1.638,0,0,0,1.672,1.611H25.079a1.638,1.638,0,0,0,1.672-1.611V10.738H17.277A1.647,1.647,0,0,1,15.6,9.127Zm4.459,15.838a.823.823,0,0,1-.836.805H7.524a.823.823,0,0,1-.836-.805v-.537a.823.823,0,0,1,.836-.805h11.7a.823.823,0,0,1,.836.805Zm0-4.3a.823.823,0,0,1-.836.805H7.524a.823.823,0,0,1-.836-.805v-.537a.823.823,0,0,1,.836-.805h11.7a.823.823,0,0,1,.836.805Zm0-4.832v.537a.823.823,0,0,1-.836.805H7.524a.823.823,0,0,1-.836-.805v-.537a.823.823,0,0,1,.836-.805h11.7A.823.823,0,0,1,20.063,15.838Zm6.688-7.657V8.59H17.834V0h.425a1.7,1.7,0,0,1,1.184.47l6.82,6.577A1.576,1.576,0,0,1,26.751,8.181Z"
                                  fill="#708a61"
                                />
                              </svg>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <TableRowEmptyComp
                        text={useLang(
                          "data not available",
                          "البيانات غير متوفرة"
                        )}
                        colspan={9}
                      />
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChangeAndDividendsTable;
