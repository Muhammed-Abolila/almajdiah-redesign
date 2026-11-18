import Calendar from "./OverviewSubsections/Calendar";
import Chart from "./OverviewSubsections/Chart";
import Disclosures from "./OverviewSubsections/Disclosures";
import FinancialsHighlights from "./OverviewSubsections/FinancialsHighlights";
import LatestNews from "./OverviewSubsections/LatestNews";
import MarketData from "./OverviewSubsections/MarketData";
import OverviewSubSection from "./OverviewSubsections/OverviewSubSection";
import Ratios from "./OverviewSubsections/Ratios";
import Earnings from "./OverviewSubsections/Earnings";
const Overview = () => {
  return (
    <section className="overview container space-between-sections">
      <OverviewSubSection />
      {/* chart section */}
      <section className="row row-gap-4 space-between-sections">
        <Chart />
        <MarketData />
      </section>
      {/* calender section */}
      <Calendar />
      {/* latest news section */}
      <LatestNews />
      {/* disclusers section */}
      <Disclosures />
      {/* ratios section */}
      <Ratios />
      {/* Earnings reports section  */}
      <Earnings />
      {/* financial highlights */}
      <FinancialsHighlights/>
    </section>
  );
};

export default Overview;
