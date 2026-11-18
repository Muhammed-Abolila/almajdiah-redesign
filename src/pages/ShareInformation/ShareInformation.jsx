import { Outlet } from "react-router";
import NavTabs from "../../components/ui/NavTabs/NavTabs";
import useLang from "../../utils/useLang";
const ShareInformation = () => {
const nestedNavs = [
  {
    label: useLang("chart", "الرسم البياني"),
    to: `chart`,
    noScroll:true
  },
  {
    label: useLang("peers", "شركات القطاع"),
    to: `peers`,
    noScroll:true
  },
  {
    label: useLang("investment calculator", "حاسبة الإستثمار"),
    to: `investment-calculator`,
    noScroll:true
  },
];

  return (
   <section className="share-information container space-between-sections">
      <NavTabs tabs={nestedNavs} />
      <div className="space-between-sections">
        <Outlet />
      </div>
    </section>
  );
};
export default ShareInformation;
