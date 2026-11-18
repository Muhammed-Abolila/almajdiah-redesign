import { Outlet } from "react-router";
import NavTabs from "../../components/ui/NavTabs/NavTabs";
import useLang from "../../utils/useLang";
const FinancialInformation = () => {
const nestedNavs = [
  {
    label: useLang("statement", "القوائم"),
    to: `statments`,
    noScroll:true
  },
  {
    label: useLang("ratios", "المؤشرات"),
    to: `ratios`,
    noScroll:true
  },
  {
    label: useLang("reports", "التقارير"),
    to: `reports`,
    noScroll:true
  },
];

  return (
    <section className="financial-information container space-between-sections">
      <NavTabs tabs={nestedNavs} />
      <div className="space-between-sections">
        <Outlet />
      </div>
    </section>
  );
};
export default FinancialInformation;
