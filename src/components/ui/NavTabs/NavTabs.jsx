import { NavLink } from "react-router";
const NavTabs = ({ tabs, activeTab, setActiveTab, flexDirection }) => {
  return (
    <ul
      className={`custom-nav-tabs m-0 p-0 d-flex gap-3 gap-sm-4 ${flexDirection}`}
    >
      {tabs.map((item, idx) => (
        <li
          key={idx}
          onClick={item?.tab ? () => setActiveTab(item?.tab) : undefined}
          className={`list-unstyled text-capitalize  cursor-pointer fw-semibold ${
            item?.tab && activeTab == item.tab && "active"
          }`}
        >
          {item?.to && (
            <NavLink
              className="text-decoration-none fw-semibold"
              to={item.to}
              state={item?.noScroll ? { noScroll: true } : {}}
            >
              {item?.label}
            </NavLink>
          )}
          {item?.tab && item?.label}
        </li>
      ))}
    </ul>
  );
};

export default NavTabs;
