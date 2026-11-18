import CustomLink from "../../../components/common/customLink/CustomLink";
import useLang from "../../../utils/useLang";
import NewsCard from "../../../components/common/newsCard/NewsCard";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const LatestNews = () => {
  const { data: latestNewsData, isLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW_LATESTNEWS.KEY],
    `${API_ENDPOINTS.OVERVIEW_LATESTNEWS.URL}/${useLang(
      "en",
      "ar"
    )}?recordSize=3`
  );
  return (
    <section className="space-between-sections">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="section-title m-0">
          {useLang("latest news", "الأخبار")}
        </h2>
        <CustomLink
          text={useLang("read more", "المزيد")}
          link={`/${useLang("en", "ar")}/news-events/news`}
        />
      </div>
      <div className="row row-gap-5 mt-4">
        {isLoading ?
          <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
          :
          (latestNewsData?.map((item, idx) => (
            <div
              key={idx}
              className="col-12 col-lg-4"
              style={{ maxHeight: "500px" }}
            >
              <NewsCard
                img={item?.iconURL}
                link={`/${useLang("en", "ar")}/news-events/news/${item?.articleID
                  }`}
                date={item?.publishedOn}
                title={item?.title}
              />
            </div>
          )))
        }

      </div>
    </section>
  );
};
export default LatestNews;
