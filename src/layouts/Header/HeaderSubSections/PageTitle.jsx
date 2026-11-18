import useLang from "../../../utils/useLang";
import { useLocation } from "react-router";
const PageTitle = ({menuItems}) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const currentPath = menuItems.find((item) =>
    item.link.includes(pathParts[2])
  );
  return (
    <div className="text-center fw-medium">
      <p
        className="custom-fs-2 font-size m-0 text-capitalize"
        style={{ color: "var(--identity-color)" }}
      >
        {useLang("investor relations", "علاقات المستثمرين")}
      </p>

      <h2
        className="custom-fs-1 text-capitalize m-0 mt-3"
        style={{ color: "var(--white-color)" }}
      >
        {currentPath?.title}
      </h2>
    </div>
  );
};

export default PageTitle;
