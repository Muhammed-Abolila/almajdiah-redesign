import { Link } from "react-router";
import { formatDate } from "../../../utils/helper";
import calendar from "../../../assets/calendar.svg";
const NewsCard = ({ img, link, date, title }) => {
  return (
    <Link to={link} className="text-dark text-decoration-none">
      <div className="news-article custom-fs-6 fw-medium">
        {/* article image */}
        {/* {img && (
          <div className="article-image mb-2">
            <img
              src={img}
              className="w-100 h-100"
              style={{
                minHeight: "200px",
                maxHeight: "300px",
                aspectRatio: "1/.75",
              }}
              loading="lazy"
            />
          </div>
        )} */}

        {/* article head */}
        <time
          dateTime={date}
          className="article-date d-flex gap-2 pb-2 border-bottom custom-fs-6 fw-bold"
        >
          <img
            src={calendar}
            alt="almajdiah"
            style={{ width: "22px", height: "22px" }}
          />
          {formatDate(date, "DD monthName,YY")}
        </time>
        {/* article body */}
        <p className="article-body text-capitalize m-0 mt-2">{title}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
