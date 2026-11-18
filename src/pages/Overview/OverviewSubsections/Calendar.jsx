import CustomLink from "../../../components/common/customLink/CustomLink";
import useLang from "../../../utils/useLang";
import useRequest from "../../../utils/useRequest";
import { API_ENDPOINTS } from "../../../services/apis";
import CalendarCard from "../../../components/common/CalendarCard/CalendarCard";
import CalendarModal from "../../../components/common/CalendarModal";
import { useState } from "react";
import Loader from "../../../layouts/Loader/Loader";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const Calendar = () => {
  const [selectedarticle, setSelectedArticle] = useState({});
  const { data: calendarData, isLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW_CALANDER.KEY],
    `${API_ENDPOINTS.OVERVIEW_CALANDER.URL}?recordSize=3`
  );

  return (
    <section className="space-between-sections">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="section-title m-0">
          {useLang("IR calendar", "المفكرة")}
        </h2>
        <CustomLink
          text={useLang("read more", "المزيد")}
          link={`/${useLang("en", "ar")}/news-events/calendar`}
        />
      </div>

      <div className="row row-gap-5 mt-4 justify-content-between">
        {isLoading ?
          <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
          :
          (calendarData?.map((item, idx) => (
            <CalendarCard
              key={idx}
              item={item}
              getChoosedItem={setSelectedArticle}
            />
          ))
          )
        }
      </div>
      <CalendarModal article={selectedarticle} />
    </section>
  );
};
export default Calendar;
