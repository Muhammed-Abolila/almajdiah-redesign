import useLang from "../../utils/useLang";
import Navbar from "./HeaderSubSections/Navbar";
import PageTitle from "./HeaderSubSections/PageTitle";
import ShareInfo from "./HeaderSubSections/ShareInfo";
import "./Header.css";
import overView from "../../assets//navbar/overview.svg"
import profile from "../../assets//navbar/profile.svg"
import board from "../../assets//navbar/board.svg"
import share from "../../assets//navbar/share.svg"
import finincial from "../../assets//navbar/finincial.svg"
import major from "../../assets//navbar/major.svg"
import foreign from "../../assets//navbar/foreign.svg"
import presention from "../../assets//navbar/presention.svg"
import segments from "../../assets//navbar/segments.svg"
import corporate from "../../assets//navbar/corporate.svg"
import news from "../../assets//navbar/news.svg"
import contact from "../../assets//navbar/contact.svg"
const Header = () => {
  const menuItems = [
    {
      icon: overView,
      title: useLang("overview", "معلومات الشركة"),
      link: "",
    },
    {
      icon:profile,
      title: useLang("profile", "ملف الشركة"),
      link: "/profile",
    },
    {
      icon:board,
      title: useLang("board & management", "الهيكل التنظيمي"),
      link: "/board",
    },
    {
      icon:share,
      title: useLang("share information", "معلومات السهم"),
      link: "/share-information",
    },
    {
      icon:finincial,
      title: useLang("financial information", "المعلومات المالية"),
      link: "/financial-information",
    },
    {
      icon: major,
      title: useLang("major shareholders", "كبار المساهمين"),
      link: "/major-shareholders",
    },

    {
      icon: foreign,
      title: useLang("foreign ownership", "ملكية الأجانب"),
      link: "/foreign-ownership",
    },

    {
      icon: presention,
      title: useLang("investor presentations", "عرض المستثمرين"),
      link: "/investor-presentations",
    },

    {
      icon: segments,
      title: useLang("business segments", "التحليل القطاعي"),
      link: "/business-segments",
    },

    {
      icon: corporate,
      title: useLang("corporate actions", "إجراءات الشركة"),
      link: "/corporate-actions",
    },

    {
      icon: news,
      title: useLang("news and events", "الأخبار"),
      link: "/news-events",
    },
    {
      icon:contact,
      title: useLang("contact IR", "تواصل مع الشركة"),
      link: "/contact",
    },
  ];
  return (
    <section className="header-section position-relative d-flex flex-column justify-content-between align-items-center">
      {/* navbar */}
      <Navbar menuItems={menuItems} />
      {/* centered content */}
      <PageTitle menuItems={menuItems} />
      {/* share info */}
      <ShareInfo />
    </section>
  );
};
export default Header;
