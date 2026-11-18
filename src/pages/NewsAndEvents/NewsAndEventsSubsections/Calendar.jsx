import { useState } from "react";
import CalendarCard from "../../../components/common/CalendarCard/CalendarCard";
import CalendarModal from "../../../components/common/CalendarModal";
import { API_ENDPOINTS } from "../../../services/apis";
import useRequest from "../../../utils/useRequest";
import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
const Calendar = () => {
  const [selectedarticle, setSelectedArticle] = useState({});
  const { data: calendarData, isLoading } = useRequest(
    [API_ENDPOINTS.OVERVIEW_CALANDER.KEY, "all"],
    `${API_ENDPOINTS.OVERVIEW_CALANDER.URL}`
  );
  return (
    <div className="row row-gap-5 mt-4">
      {isLoading ? (
        <SkeletonCard length={3} className="col-12 col-md-6 col-lg-4" />
      ) : (
        calendarData?.map((item, idx) => (
          <CalendarCard
            key={idx}
            item={item}
            getChoosedItem={setSelectedArticle}
          />
        ))
      )}
      <CalendarModal article={selectedarticle} />
    </div>
  );
};
export default Calendar;
