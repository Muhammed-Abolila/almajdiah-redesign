import { useState } from "react";
import { formatDate, formatNumber } from "../../utils/helper";
import useRequest from "../../utils/useRequest";
import useLang from "../../utils/useLang";
import { API_ENDPOINTS } from "../../services/apis";
import "./TickerBar.css";
const TickerBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data } = useRequest(
    [`${API_ENDPOINTS.TICKER_BAR.KEY}`],
    `${API_ENDPOINTS.TICKER_BAR.URL}/${useLang("en", "ar")}`
  );
  if (!data) return null;
  // Create duplicate items for seamless looping
  const tickerItems = [
    {
      type: "price",
      content: (
        <>
          <span className="fs-6" style={{ color: "var(--identity-color)" }}>
             {useLang(data?.calendarEvent?.marketNameEn, data?.calendarEvent?.marketNameAr)}:
          </span>
          <span
            className="fs-6 text-white"
            style={{ color: "var(--identity-color)" }}
          >
            {useLang(data?.calendarEvent?.companyNameEn, data?.calendarEvent?.companyNameAr)}
          </span>
          <span className="custom-fs-5">
            {formatNumber(data?.price?.closeValue)}
            <sup>{useLang("SAR", "ريال")}</sup>
          </span>
          <span className="fs-6 bg-blue text-white">
            {data?.price?.change > 0
              ? `${formatNumber(data?.price?.change)}`
              : `${formatNumber(data?.price?.change)}`}{" "}
            {`(${formatNumber(data?.price?.percentageChange)}%)`}
          </span>
        </>
      ),
    },
    {
      type: "event",
      content: (
        <>
          <span className="fs-6" style={{ color: "var(--identity-color)" }}>
            {useLang("Calendar:", "المفكرة:")}
          </span>
          <span className="fs-6 bg-border" style={{ color: "#DDDDDD" }}>
             {formatDate(data?.calendarEvent?.occursOn, "DD-MM-YYYY")}
          </span>
          <span className="fs-6">
            {useLang(
              data?.calendarEvent?.titleEn,
              data?.calendarEvent?.titleAr
            )}
          </span>
        </>
      ),
    },
    {
      type: "news",
      content: (
        <>
          <span className="fs-6" style={{ color: "var(--identity-color)" }}>
            {useLang("News:", "الأخبار:")}
          </span>
          <span className="fs-6 bg-border" style={{ color: "#DDDDDD" }}>
           {formatDate(data?.news?.publishedOn, "DD-MM-YYYY")}

          </span>
          <span className="fs-6">{data?.news?.title}</span>
        </>
      ),
    },
  ];
  // Duplicate the items to create seamless looping
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div
      className="ticker-bar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container">
        <div className="ticker-container">
          <div className={`ticker-content ${isHovered ? "paused" : ""}`}>
            {duplicatedItems.map((item, index) => (
              <div
                key={index}
                className="ticker-item"
                style={{
                  borderInlineEnd: "3px solid var(--identity-color)",
                  cursor: item.onClick ? "pointer" : "default",
                }}
                onClick={item.onClick}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerBar;
