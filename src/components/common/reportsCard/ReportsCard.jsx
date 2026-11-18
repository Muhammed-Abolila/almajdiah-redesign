import useLang from "../../../utils/useLang";
import { formatDate } from "../../../utils/helper";
const ReportsCard = ({ companyName, desc, file, date, isYear }) => {
  return (
    <div
      className="reports-card fw-medium"
      style={{ height: desc ? "200px" : "auto" }}
    >
      {desc && (
        <div
          className="pt-4 d-flex flex-column"
          style={{
            borderBottom: "1px solid var(--border-color)",
            borderTop: "1px solid var(--border-color)",
            height: "60%",
          }}
        >
          {companyName && (
            <p
              className="text-capitalize custom-fs-6 mb-3"
              style={{ color: "var(--identity-color)" }}
            >
              {companyName}
            </p>
          )}
          <p className="m-0">{desc}</p>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3 g-5">
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="d-flex justify-content-between align-items-center gap-1 text-decoration-none"
          style={{ color: "var(--second-black-color)" }}
        >
          <i
            className="bi bi-file-earmark-pdf custom-fs-3"
            style={{ color: "var(--identity-color)" }}
          ></i>
          <p className="m-0 custom-fs-6 text-capitalize">
            {useLang("download file", "تحميل الملف")}
          </p>
        </a>
        <time
          className="date m-0 text-capitalize custom-fs-6"
          style={{ color: "var(--text-color)" }}
          dateTime={date}
        >
          {isYear ? date : formatDate(date, "DD monthName,YY")}
        </time>
      </div>
    </div>
  );
};
export default ReportsCard;
