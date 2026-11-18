import useLang from "../../../../utils/useLang";
import { Outlet } from "react-router";
import NavTabs from "../../../../components/ui/NavTabs/NavTabs";
const Peers = () => {
  // tabs data
  const nestedNavs = [
    {
      label: useLang("general", "معلومات عامة"),
      to: `general`,
      noScroll:true
    },
    {
      label: useLang("ranking", "ترتيب الشركات"),
      to: `ranking`,
      noScroll:true
    },
    {
      label: useLang("growth", "النمو"),
      to: `growth`,
      noScroll:true
    },
    {
      label: useLang("market performance", "أداء الشركة"),
      to: `market-performance`,
      noScroll:true
    },
    {
      label: useLang("per share data (Riyal)", "بيانات السهم (ريال)"),
      to: `per-share-data`,
      noScroll:true
    },
    {
      label: useLang("salaries and benefits", "المكافأت والمزايا"),
      to: `salaries-benefits`,
      noScroll:true
    },
  ];
  return (
    <div className="peers">
      <h2 className="section-title mb-4">{useLang("peers", "شركات القطاع")}</h2>
      <NavTabs tabs={nestedNavs} flexDirection={"flex-column flex-lg-row"}/>
      <Outlet />
    </div>
  );
};

export default Peers;
