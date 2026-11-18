import { Link, useLocation } from "react-router";
import useRequest from "../../../utils/useRequest";
import useLang from "../../../utils/useLang";
import { API_ENDPOINTS } from "../../../services/apis";
import parse from "html-react-parser";
import {formatDate } from "../../../utils/helper";
import "./Article.css";
import NotFound from "../../NotFound/NotFound";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";
const Article = () => {
  const location = useLocation();
  const url = location?.pathname.split("/");
  const section = url[3];
  const articleId = url[4];
  const { data: disclosuresData, isLoading: disclosuresLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW_DISCLOSURES.KEY, "all"],
    `${API_ENDPOINTS.OVERVIEW_DISCLOSURES.URL}/${useLang("en", "ar")}`,
    { enabled: section == "disclosures" }
  );
  const { data: latestNewsData, isLoading: latestNewsLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW_LATESTNEWS.KEY, "all"],
    `${API_ENDPOINTS.OVERVIEW_LATESTNEWS.URL}/${useLang("en", "ar")}`,
    { enabled: section == "news" }
  );
  let spacificArticle = {};
  if (section == "disclosures") {
    spacificArticle = disclosuresData?.find(
      (item) => item?.articleID == articleId
    );
  } else if (section == "news") {
    spacificArticle = latestNewsData?.find(
      (item) => item?.articleID == articleId
    );
  }
  if (!latestNewsLoading && !disclosuresLoading && !spacificArticle) return <NotFound />;
  return (
    <section className="article-details mb-5 position-relative">
      {latestNewsLoading || disclosuresLoading ? (
        <SkeletonTable rows={10} />
      ) : (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-capitalize custom-fs-5 fw-medium">
              <li className="breadcrumb-item">
                {section == "disclosures" && (
                  <Link
                    className="text-decoration-none"
                    style={{ color: "var(--text-color)" }}
                    to={`/${useLang("en", "ar")}/news-events/disclosures`}
                  >
                    {useLang("all disclosures", "كل الإفصاحات")}
                  </Link>
                )}
                {section == "news" && (
                  <Link
                    className="text-decoration-none"
                    style={{ color: "var(--text-color)" }}
                    to={`/${useLang("en", "ar")}/news-events/news`}
                  >
                    {useLang("all news", "كل الأخبار")}
                  </Link>
                )}
              </li>
              <li
                className="breadcrumb-item active"
                style={{ color: "var(--black-color)" }}
                aria-current="page"
              >
                {useLang("article", "المقال")}
              </li>
            </ol>
          </nav>
          <h2 className="section-title mt-5 mb-3 mb-lg-4">
            {spacificArticle?.title}
          </h2>
          <div className="d-flex align-items-center gap-4 custom-fs-6 mt-4 mb-3">
            <time
              dateTime={spacificArticle?.publishedOn}
              className="m-0"
              style={{ color: "var(--identity-color)" }}
            >
              {formatDate(spacificArticle?.publishedOn, "DD/MM/YYYY")}
            </time>
            <p className="m-0" style={{ color: "var(--text-color)" }}>
              {spacificArticle?.articleSourceName}
            </p>
          </div>
          <div className="danger-html" dangerouslySetInnerHTML={{ __html: spacificArticle?.body }} />
        </>
      )}
    </section>
  );
};

export default Article;
