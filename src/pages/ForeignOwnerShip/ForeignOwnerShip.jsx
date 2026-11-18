import CustomTd from "../../components/common/customTd/CustomTd";
import { API_ENDPOINTS } from "../../services/apis";
import { colorAndBgColorDependOnNumber, formatDate, formatNumber } from "../../utils/helper";
import useLang from "../../utils/useLang";
import useRequest from "../../utils/useRequest";
import SkeletonTable from "../../components/ui/SkeletonTable/SkeletonTable";
const ForeignOwnerShip = () => {
const tableHeaders = [
  { title: useLang("date", "التاريخ") },
  { title: useLang("prev. holding", "الملكية السابقة") },
  { title: useLang("current holding", "الملكية الحالية") },
  { title: useLang("change", "التغير") },
  { title: useLang("no. of shares", "عدد الأسهم") },
  { title: useLang("close price", "سعر الإغلاق") },
];
  // 1- fetch majoir share holders data from API using useRequest
  const { data: foreignOwnershipData, isLoading } = useRequest(
    [API_ENDPOINTS.FOREIGN_OWNERSHIP.KEY],
    API_ENDPOINTS.FOREIGN_OWNERSHIP.URL
  );
  return (
    <section className="foreign container space-between-sections pb-5">
      <h2 className="section-title mb-4">
        {useLang("foreign ownership", "ملكية الأجانب")}
      </h2>

      <div className="overflow-auto pb-5">
        {isLoading ? (
          <SkeletonTable columns={1} rows={3} />
        ) : (
          <table className="w-100 fs-6" style={{ minWidth: "650px" }}>
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
            {foreignOwnershipData?.map((item, idx) => (
              <tr key={idx} style={{color:"var(--second-black-color)"}}>
                <CustomTd textCenter={false} label={formatDate(item?.Date)} />
                <CustomTd label={`${formatNumber(item?.PreviousHoldingPercentage)} %`} />
                <CustomTd label={`${formatNumber(item?.CurrentHoldingPercentage)} %`} />
                <CustomTd label={`${formatNumber(item?.PercentageChange)} %`} style={{color:colorAndBgColorDependOnNumber(item?.PercentageChange)}}/>
                <CustomTd label={formatNumber(item?.NoOfShares,0,"0")} />
                <CustomTd label={formatNumber(item?.ClosePrice)} />
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </section>
  );
};

export default ForeignOwnerShip;
