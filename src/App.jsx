import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router";
import Layout from "./Layout";
import useLang from "./utils/useLang.js";
import Statments from "./pages/FinancialInformation/FinancialInformationSubSections/Statments.jsx";
import Ratios from "./pages/FinancialInformation/FinancialInformationSubSections/Ratios.jsx";
import Reports from "./pages/FinancialInformation/FinancialInformationSubSections/Reports.jsx";
import Contact from "./pages/ContactIR/Contact.jsx";
import ForeignOwnerShip from "./pages/ForeignOwnerShip/ForeignOwnerShip.jsx";
import InvestorPresentation from "./pages/InvestorPresentation/InvestorPresentation.jsx";
import Article from "./pages/NewsAndEvents/Article/Article.jsx";
import InvestmentCalculator from "./pages/ShareInformation/ShareInformationSubsections/InvestmentCalculator.jsx";
import Peers from "./pages/ShareInformation/ShareInformationSubsections/Peers/Peers.jsx";
import Chart from "./pages/ShareInformation/ShareInformationSubsections/Chart/Chart.jsx";
import General from "./pages/ShareInformation/ShareInformationSubsections/Peers/PeersSubSections/General.jsx";
import Ranking from "./pages/ShareInformation/ShareInformationSubsections/Peers/PeersSubSections/Ranking.jsx";
import Growth from "./pages/ShareInformation/ShareInformationSubsections/Peers/PeersSubSections/Growth.jsx";
import MarketPerformance from "./pages/ShareInformation/ShareInformationSubsections/Peers/PeersSubSections/MarketPerformance.jsx";
import ShareData from "./pages/ShareInformation/ShareInformationSubsections/Peers/PeersSubSections/ShareData.jsx";
import SalariesBenefits from "./pages/ShareInformation/ShareInformationSubsections/Peers/PeersSubSections/SalariesBenfits.jsx";
import Earnings from "./pages/NewsAndEvents/NewsAndEventsSubsections/Earnings.jsx";
import Loader from "./layouts/Loader/Loader.jsx";
const Overview = lazy(() => import("./pages/Overview/Overview"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const Board = lazy(() => import("./pages/Board/Board.jsx"));
const ShareInformation = lazy(() =>
  import("./pages/ShareInformation/ShareInformation.jsx")
);
const FinancialInformation = lazy(() =>
  import("./pages/FinancialInformation/FinancialInformation.jsx")
);
const MajorShareholders = lazy(() =>
  import("./pages/MajorShareholders/MajorShareholders.jsx")
);
const BusinessSegments = lazy(() =>
  import("./pages/BusinessSegments/BusinessSegments.jsx")
);
const CorporateActions = lazy(() =>
  import("./pages/CorporateActions/CorporateActions.jsx")
);
const NewsAndEvents = lazy(() =>
  import("./pages/NewsAndEvents/NewsAndEvents.jsx")
);
const Calendar = lazy(() =>
  import("./pages/NewsAndEvents/NewsAndEventsSubsections/Calendar.jsx")
);
const News = lazy(() =>
  import("./pages/NewsAndEvents/NewsAndEventsSubsections/News.jsx")
);
const Disclosures = lazy(() =>import("./pages/NewsAndEvents/NewsAndEventsSubsections/Disclosures.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

const App = () => {
  const lang = useLang("en", "ar");
  const LangRedirectWrapper = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    if (pathParts[1] !== lang) {
      pathParts[1] = lang;
      return <Navigate to={pathParts.join("/")} replace />;
    }
    return <NotFound />;
  };
  const router = createBrowserRouter(
    [
      {
        path: lang,
        element: <Layout />,
        children: [
          { index: true, element: <Overview /> },
          { path: "profile", element: <Profile /> },
          { path: "board", element: <Board /> },
          {
            path: "share-information",
            element: <ShareInformation />,
            children: [
              { index: true, element: <Navigate to="chart" replace /> },
              { path: "chart", element: <Chart /> },
              {
                path: "peers",
                element: <Peers />,
                children: [
                  { index: true, element: <Navigate to="general" replace /> },
                  { path: "general", element: <General /> },
                  { path: "ranking", element: <Ranking /> },
                  { path: "growth", element: <Growth /> },
                  {
                    path: "market-performance",
                    element: <MarketPerformance />,
                  },
                  { path: "per-share-data", element: <ShareData /> },
                  { path: "salaries-benefits", element: <SalariesBenefits /> },
                ],
              },
              {
                path: "investment-calculator",
                element: <InvestmentCalculator />,
              },
            ],
          },
          {
            path: "financial-information",
            element: <FinancialInformation />,
            children: [
              { index: true, element: <Navigate to="statments" replace /> },
              { path: "statments", element: <Statments /> },
              { path: "ratios", element: <Ratios /> },
              { path: "reports", element: <Reports /> },
            ],
          },
          { path: "major-shareholders", element: <MajorShareholders /> },
          { path: "foreign-ownership", element: <ForeignOwnerShip /> },
          { path: "investor-presentations", element: <InvestorPresentation /> },

          { path: "business-segments", element: <BusinessSegments /> },
          { path: "corporate-actions", element: <CorporateActions /> },
          {
            path: "news-events",
            element: <NewsAndEvents />,
            children: [
              { index: true, element: <Navigate to="calendar" replace /> },
              {
                path: "calendar",
                element: <Calendar />,
              },
              {
                path: "news",
                element: <News />,
                children: [{ path: ":id", element: <Article /> }],
              },
              {
                path: "disclosures",
                element: <Disclosures />,
                children: [{ path: ":id", element: <Article /> }],
              },
              {
                path: "earnings",
                element: <Earnings />,
              },
            ],
          },
          { path: "contact", element: <Contact /> },
        ],
      },
      {
        path: "*",
        element: <LangRedirectWrapper />,
      },
    ],
  );

  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
