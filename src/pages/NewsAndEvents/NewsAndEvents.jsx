import { Outlet, useParams } from "react-router";
import NavTabs from "../../components/ui/NavTabs/NavTabs";
import useLang from "../../utils/useLang";
const NewsAndEvents = () => {
  const { id } = useParams();
  const nestedNavs = [
    {
      label: useLang("IR calendar", "المفكره"),
      to: `calendar`,
      noScroll:true
    },
    {
      label: useLang("latest news", "الأخبار"),
      to: `news`,
      noScroll:true
    },
    {
      label: useLang("disclosures", "الإفصاحات"),
      to: `disclosures`,
      noScroll:true
    },
        {
      label: useLang("earnings", "التقارير المالية"),
      to: `earnings`,
      noScroll:true
    },
  ];
  return (
    <section className="news-events container space-between-sections">
      {!id && <NavTabs tabs={nestedNavs} />}
      <div className="mt-5">
        <Outlet />
      </div>
    </section>
  );
};

export default NewsAndEvents;
