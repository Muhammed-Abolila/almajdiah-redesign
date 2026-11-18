import { formatDate } from "../../../utils/helper";
import useLang from "../../../utils/useLang";
import calendar from "../../../assets/calendar.svg"

const CalendarCard = ({ item, getChoosedItem }) => {
  return (
    <div
      className="col-12 col-lg-4 cursor-pointer"
      data-bs-target="#calendarModal"
      data-bs-toggle="modal"
      style={{ maxHeight: "500px" }}
      onClick={() => getChoosedItem(item)}
    >
      <div className="news-article custom-fs-6 fw-medium">
        {/* article head */}
        <time
          dateTime={item?.occursOn}
          className="article-date d-flex gap-2 pb-2 border-bottom custom-fs-6 fw-bold"
        >
          <img src={calendar} alt="almajdiah" style={{width:"22px",height:"22px"}} />

          {formatDate(item?.occursOn, "DD monthName,YY")}
        </time>
        {/* article body */}
        <p className="article-body m-0 mt-2 text-capitalize">
          {useLang(item?.typeNameEn, item?.typeNameAr)}
        </p>
      </div>
    </div>
  );
};

export default CalendarCard;
