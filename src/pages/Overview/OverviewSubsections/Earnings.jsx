import { Link } from "react-router";
import useLang from "../../../utils/useLang";
import ReportsCard from "../../../components/common/reportsCard/ReportsCard";
import { API_ENDPOINTS } from "../../../services/apis";
import useRequest from "../../../utils/useRequest";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const Earnings = () => {
  const { data, isLoading } = useRequest(
    [API_ENDPOINTS.EARNINGS.KEY],
    `${API_ENDPOINTS.EARNINGS.URL}/${useLang("en", "ar")}?recordSize=3`
  );
  return (
    <section className="space-between-sections">
      <Link to={`news-events/earnings`} className="text-dark text-decoration-none" state={{ fromHome: true }}>
        <div className="d-flex align-items-center gap-3 custom-fs-4">
          <h2 className="section-title m-0">
            {useLang("earnings reports", "النتائج المالية")}
          </h2>
          <i className={`bi bi-chevron-${useLang("right", "left")}`}></i>
        </div>
      </Link>
      <div className="row row-gap-4 mt-4">
        {isLoading ? (
          <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
        ) : (
          data?.length > 0 && data?.map((item, idx) => (
            <div key={idx} className="col-12 col-lg-4">
              <ReportsCard desc={item?.title} file={useLang(item?.fileURLEn, item?.fileURLAr)} date={item?.forYear} isYear={true} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};
export default Earnings;