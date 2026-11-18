import { Outlet, useParams } from "react-router";
import NewsCard from "../../../components/common/newsCard/NewsCard";
import { API_ENDPOINTS } from "../../../services/apis";
import useLang from "../../../utils/useLang";
import useRequest from "../../../utils/useRequest";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const News = () => {
  const { id } = useParams();
  const { data: latestNewsData, isLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW_LATESTNEWS.KEY, "all"],
    `${API_ENDPOINTS.OVERVIEW_LATESTNEWS.URL}/${useLang("en", "ar")}`
  );
  if (id) return <Outlet />;
  return (
    <div className="row row-gap-5 mt-4">
      {isLoading ? (
        <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
      ) : (
        <>
          {latestNewsData?.map((item, idx) => (
            <div
              key={idx}
              className="col-12 col-md-6 col-lg-4"
              style={{ maxHeight: "500px" }}
            >
              <NewsCard
                img={item?.iconURL}
                link={`/${useLang("en", "ar")}/news-events/news/${
                  item?.articleID
                }`}
                date={item?.publishedOn}
                title={item?.title}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default News;
