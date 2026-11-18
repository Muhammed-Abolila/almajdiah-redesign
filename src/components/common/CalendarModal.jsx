import useLang from "../../utils/useLang";
import parse from "html-react-parser";
const CalendarModal = ({ article }) => {
  const detailsList = [
    {
      key: useLang("market", "السوق"),
      value: useLang(
        article?.marketNameEn || "-",
        article?.marketNameAr || "-"
      ),
    },
    {
      key: useLang("company", "الشركة"),
      value: useLang(
        article?.companyNameEn || "-",
        article?.companyNameAr || "-"
      ),
    },
    {
      key: useLang("date", "التاريخ"),
      value: article?.occursOn || "-",
    },
    {
      key: useLang("calendar event type", "نوع الحدث"),
      value: useLang(article?.typeNameEn || "-", article?.typeNameAr || "-"),
    },
    {
      key: useLang("event result", "النتائج"),
      value: "-",
    },
    {
      key: useLang("venue", "الموقع"),
      value: useLang(
        article?.eventLocationEn || "-",
        article?.eventLocationAr || "-"
      ),
    },
  ];
  
  return (
    <div
      className="modal fade"
      id="calendarModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body py-0 text-capitalize px-4">
            <h3 className="text-center ">
              {useLang(article?.titleEn, article?.titleAr)}
            </h3>
            <ul className="list-unstyled pt-2 pt-md-5 pb-4 px-0">
              {detailsList?.map((item, idx) => (
                <li
                  key={idx}
                  className="py-2 d-flex align-items-center border-bottom"
                >
                  <p
                    className="m-0 w-50"
                    style={{ color: "var(--text-color)" }}
                  >
                    {item?.key}
                  </p>
                  <p className="m-0 w-50">{item?.value}</p>
                </li>
              ))}
            </ul>

          </div>
          <div className="modal-footer px-4 mb-3 d-block">
            <h4 className="text-capitalize fs-6">{useLang("details", "التفاصيل")}</h4>
            <div className="danger-html m-0 ps-2" dangerouslySetInnerHTML={{ __html: useLang(article?.descriptionEn||"-", article?.descriptionAr||"-") }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;




