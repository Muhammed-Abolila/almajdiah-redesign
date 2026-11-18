import useLang from "../../../utils/useLang";
import "./CustomDropdown.css";
const CustomDropdown = ({ selectedItem, list, onClick }) => {
  return (
    <div className="custom-dropdown dropdown">
      <button
        className="btn dropdown-toggle d-flex justify-content-center align-items-center gap-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: "fit-content",
          fontSize:"14px",
          minWidth:"85px",
          borderRadius: "50px",
          backgroundColor: "var(--second-black-color)",
          color: "var(--white-color)",
          height: "35px",
        }}
      >
        <span className="text-capitalize">{useLang(selectedItem?.labelEn,selectedItem?.labelAr)}</span>
        <i className="bi bi-chevron-down"></i>
      </button>

      <ul
        className="dropdown-menu"
        style={{
          backgroundColor: "var(--second-black-color)",
          padding: "10px 5px",
        }}
      >
        {list.map((item, idx) => {
          const isActive = selectedItem.value === item.value;
          return (
            <li

              key={idx}
              className={`dropdown-item ${useLang("text-start","text-end")} cursor-pointer text-capitalize ${
                isActive ? "disabled" : ""
              }`}
              style={{ opacity: isActive ? "0.5" : "1" }}
              onClick={() => !isActive && onClick(item)}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{useLang(item?.labelEn,item?.labelAr)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomDropdown;
