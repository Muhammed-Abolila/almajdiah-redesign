import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import TickerBar from "./layouts/TickerBar/TickerBar";
import PoweredBy from "./layouts/Footer/FooterSubsections/PoweredBy";
const Layout = () => {
  const { pathname, state } = useLocation();
  const pathParts = pathname.split("/");
  return (
    <>
      <Header />
      {!state?.noScroll && !pathname.includes("peers") ? (
        <ScrollRestoration />
      ) : null}
      <Outlet />
      <TickerBar />
      {pathname.includes("news-events") && pathParts.length > 4 ? (
        <PoweredBy />
      ) : (
        <Footer />
      )}
    </>
  );
};
export default Layout;
