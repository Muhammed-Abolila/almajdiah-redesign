import Loader from "../../layouts/Loader/Loader";
import { API_ENDPOINTS } from "../../services/apis";
import useRequest from "../../utils/useRequest";
import "./Profile.css";
import BasicInfo from "./ProfileSubsections/BasicInfo";
import FinancialHighLights from "./ProfileSubsections/FinancialHighLights";
import Milestones from "./ProfileSubsections/Milestones";
import ProfileMajorShareholders from "./ProfileSubsections/ProfileMajorShareholders";
import ProfileOverview from "./ProfileSubsections/ProfileOverview";
import StockInfo from "./ProfileSubsections/StockInfo";
import SubsidiariesAndAssociates from "./ProfileSubsections/SubsidiariesAndAssociates";
import TradingData from "./ProfileSubsections/TradingData";
const Profile = () => {
  const { data: profileData,isLoading } = useRequest(
    [API_ENDPOINTS.PROFILE.KEY],
    API_ENDPOINTS.PROFILE.URL
  );
  return (
    <section className="profile container">
      {/* overview section */}
      <div className="row justify-content-between row-gap-4 space-between-sections">
        <ProfileOverview data={profileData?.profileInfo} isLoading={isLoading}/>
        <BasicInfo data={profileData?.profileInfo} isLoading={isLoading}/>
      </div>
      {/* trading and stock info */}
      <div className="row justify-content-between row-gap-4 space-between-sections">
        <TradingData data={profileData?.tradingData} isLoading={isLoading}/>
        <StockInfo data={profileData?.stockInfo} isLoading={isLoading} />
      </div>
      {/* financial highlights */}
      <FinancialHighLights data={profileData?.financialHighlights} isLoading={isLoading}/>
      {/* major shareholders */}
      {/* <ProfileMajorShareholders/> */}
      {/* subsidiaries & associates */}
      <SubsidiariesAndAssociates data={profileData?.subsidiaries} isLoading={isLoading}/>
      {/* milestones  */}
      <Milestones data={profileData?.milestones} isLoading={isLoading}/>

    </section>
  );
};

export default Profile;
