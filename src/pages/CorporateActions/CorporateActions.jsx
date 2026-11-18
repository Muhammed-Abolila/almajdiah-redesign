import useRequest from "../../utils/useRequest";
import { API_ENDPOINTS } from "../../services/apis";
import RecentChanges from "./CorporateActionsSubsections/RecentChanges";
import RecentDividends from "./CorporateActionsSubsections/RecentDividends";
import ChangeAndDividendsTable from "./CorporateActionsSubsections/ChangeAndDividendsTable";
import ChangesChart from "./CorporateActionsSubsections/ChangesChart";
import SkeletonChart from "../../components/ui/SkeletonChart/SkeletonChart";
const CorporateActions = () => {
  const { data: corporateActionsData, isLoading } = useRequest(
    [`${API_ENDPOINTS.CORPORATION_ACTIONS.KEY}`],
    `${API_ENDPOINTS.CORPORATION_ACTIONS.URL}`
  );
  return (
    <section className="corporate-actions container space-between-sections">
      <div className="row justify-content-between row-gap-4 gx-md-5 mt-5 ">

        <div className="col-12 col-md-6 col-xl-6 overflow-hidden">
          {isLoading ? <SkeletonChart /> :
            <ChangesChart
              type="capital"
              chartData={corporateActionsData?.capitalChartData}
            />
          }
        </div>

        <div className="col-12 col-md-6 col-xl-6 overflow-hidden">
          {isLoading ? <SkeletonChart /> :
            <ChangesChart
              type="historical"
              chartData={corporateActionsData?.dividendPerShareChartData}
            />
          }
        </div>

      </div>
      {/* <div className="row justify-content-between row-gap-4 space-between-sections">
        <RecentChanges />
        <RecentDividends />
      </div> */}
      <ChangeAndDividendsTable
        isLoading={isLoading}
        divedividendHistoryData={corporateActionsData?.capitalDividendHistory}
        capitalHistoryData={corporateActionsData?.capitalChangeHistory}
      />
    </section>
  );
};

export default CorporateActions;
