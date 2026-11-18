import useLang from "../../../utils/useLang";
const PoweredBy = () => {
  return (
    <div
      className="powered text-center fw-semibold pt-4 pb-5 mb-4"
      style={{ fontSize: ".875rem", backgroundColor: "#2a3335" }}
    >
      <span className="text-capitalize" style={{ color: "var(--white-color)" }}>
        {useLang("powered by", "طور بواسطة")}
      </span>
      <a
        href={`https://www.argaam.com/${useLang("en", "ar")}`}
        className={`text-decoration-none ${useLang("ms-1", "me-1")}`}
        style={{ color: "#ee7b0b" }}
      >
        {useLang("Argaam", "أرقام")}
      </a>
    </div>
  );
};

export default PoweredBy;
