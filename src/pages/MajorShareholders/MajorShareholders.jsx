import CustomTd from "../../components/common/customTd/CustomTd";
import { API_ENDPOINTS } from "../../services/apis";
import { formatNumber } from "../../utils/helper";
import useLang from "../../utils/useLang";
import useRequest from "../../utils/useRequest";
import SkeletonTable from "../../components/ui/SkeletonTable/SkeletonTable";

const MajorShareholders = () => {
  const tableHeaders = [
    { title: useLang("shareholders", "المالك") },
    { title: useLang("type", "النوع") },
    { title: useLang("no. of shares (m)", "عدد الأسهم (مليون)") },
    { title: useLang("holding", "نسبة الملكيه") },
    { title: useLang("market value (m)", "القيمة السوقية (مليون)") },
    { title: useLang("notes", "ملاحظات") },
  ];
  // 1- fetch majoir share holders data from API using useRequest
  const { data: majoirShareHoldersData, isLoading } = useRequest(
    [`${API_ENDPOINTS.MAJOR_SHARE_HOLDERS.KEY}`],
    `${API_ENDPOINTS.MAJOR_SHARE_HOLDERS.URL}`
  );
  if (isLoading) return <SkeletonTable columns={1} rows={5} />
  return (
    <section className="major container space-between-sections pb-5">
      <h2 className="section-title mb-4">
        {useLang("major shareholders - al majdiah", "كبار المستثمرين - الماجدية")}
      </h2>

      <div className="pb-5">
        {isLoading ? (
          <SkeletonTable columns={1} rows={5} />
        ) : (
          <div className="table-responsive">
            <table className="w-100 fs-6" style={{ minWidth: "750px" }}>
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
                      style={{ whiteSpace: "nowrap", minWidth: `${idx == 0 && "200px"}` }}
                    />
                  ))}
                </tr>
              </thead>

              <tbody>
                {majoirShareHoldersData?.shareholders?.map((item, idx) => (
                  <tr key={idx} style={{ color: "var(--second-black-color)" }}>
                    <CustomTd textCenter={false} label={useLang(item?.shareholderNameEn, item?.shareholderNameAr)} />
                    <CustomTd label={useLang(item?.shareholderTypeNameEn, item?.shareholderTypeNameAr)} />
                    <CustomTd label={formatNumber(item?.noOfShares)} />
                    <CustomTd label={`${formatNumber(item?.percentage)} %`} />
                    <CustomTd label={formatNumber(item?.marketValue)} />
                    <CustomTd label={useLang(item?.notesEn || "-", item?.notesAr || "-")} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MajorShareholders;
