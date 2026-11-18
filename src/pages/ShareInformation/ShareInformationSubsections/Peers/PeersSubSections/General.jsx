import CustomTd from "../../../../../components/common/customTd/CustomTd";
import TableRowEmptyComp from "../../../../../components/common/TableRowEmptyComp/TableRowEmptyComp";
import useLang from "../../../../../utils/useLang";
import emailPhoto from "../../../../../assets/contact/email.png";
import websitePhoto from "../../../../../assets/contact/website.png";
import PrintOptions from "../../../../../components/common/PrintOptions/PrintOptions";
import usePeersSelections from "../../../../../hooks/usePeersSelections";
import SkeletonTable from "../../../../../components/ui/SkeletonTable/SkeletonTable";
const General = () => {
  const { handleExportToExcel, data, isLoading } = usePeersSelections("general");
  const tableHeaders = [
    { title: useLang("company", "الشركة") },
    { title: useLang("argaam sector", "قطاع أرقام") },
    { title: useLang("city", "المدينة") },
    { title: useLang("phone", "الهاتف") },
    { title: useLang("fax", "الفاكس") },
    { title: useLang("email", "البريد الإلكتروني") },
    { title: useLang("website", "الموقع الإلكتروني") },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mt-5">
        <PrintOptions excelFun={handleExportToExcel} />
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
                {data?.General?.length > 0 ? (
                  <>
                    {data?.General?.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{ color: "var(--second-black-color)" }}
                      >
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
                          label={useLang(item?.cityNameEn, item?.cityNameAr)}
                        />
                        <CustomTd
                          style={{ direction: "ltr" }}
                          label={item?.companyPhoneNo}
                        />

                        <CustomTd
                          style={{ direction: "ltr" }}
                          label={item?.companyFax}
                        />
                        <td
                          className="py-3 text-center text-capitaliz"
                          style={{ paddingInlineStart: "1rem" }}
                        >
                          <a
                            className="cursor-pointer"
                            target="_blank"
                            href={`mailto:${item?.companyEmail}`}
                          >
                            <img
                              src={emailPhoto}
                              style={{ width: "20px" }}
                              loading="lazy"
                            />
                          </a>
                        </td>
                        <td
                          className="py-3 text-center text-capitaliz"
                          style={{ paddingInlineStart: "1rem" }}
                        >
                          <a href={`mailto:${item?.companyWebsiteURL}`}>
                            <img
                              src={websitePhoto}
                              style={{ width: "20px" }}
                              loading="lazy"
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <TableRowEmptyComp
                    text={useLang("no data available", " لا توجد بيانات متوفره")}
                    colspan="7"
                  />
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default General;
