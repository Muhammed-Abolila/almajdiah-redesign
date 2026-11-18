import ReportsCard from "../../../components/common/reportsCard/ReportsCard";
import { API_ENDPOINTS } from "../../../services/apis";
import useLang from "../../../utils/useLang";
import useRequest from "../../../utils/useRequest";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const Earnings = () => {
  const { data, isLoading } = useRequest(
    [API_ENDPOINTS.EARNINGS.KEY],
    `${API_ENDPOINTS.EARNINGS.URL}/${useLang("en", "ar")}`
  );
  return (
    <div className="row row-gap-5 mt-4">
      {isLoading ? (
         <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
      ) : (
        data?.length > 0 &&
        data?.map((item, idx) => (
          <div key={idx} className="col-12 col-lg-4">
            <ReportsCard
              desc={item?.title}
              file={useLang(item?.fileURLEn, item?.fileURLAr)}
              date={item?.forYear}
              isYear={true}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Earnings;
