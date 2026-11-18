import imgPlaceholder from "../../../../src/assets/img_placeholder.png";
import CustomTd from "../../../components/common/customTd/CustomTd";
import parse from "html-react-parser";
import useLang from "../../../utils/useLang";
const BoardModal = ({ boradMember }) => {
  return (
    <div
      className="modal board-modal fade"
      id="boardModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* close btn */}
          <div
            className="modal-header border-0 text-capitalize justify-content-end cursor-pointer"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i
              className="custom-fs-5 bi bi-x-circle-fill"
              style={{ color: "var(--identity-color)" }}
            ></i>
            <p className="m-0 mx-2">{useLang("close", "إغلاق")}</p>
          </div>

          <div className="modal-body py-0 text-capitalize px-4">
            {/* image and name container */}
            <div className="title-container row row-gap-4 align-items-center mb-5">
              <div
                className="img-container col-5 col-sm-2 m-auto m-sm-0"
                style={{
                  aspectRatio: "1/1",
                  maxHeight: "250px",
                  minHeight: "200px",
                  minWidth: "150px",
                }}
              >
                <img
                  src={
                    boradMember?.profilePicURL
                      ? boradMember?.profilePicURL
                      : imgPlaceholder
                  }
                  alt={useLang(boradMember?.nameEn, boradMember?.nameAr)}
                  className="w-100 h-100"
                />
              </div>
              <div className="caption col-12 col-sm-8">
                <h2
                  className="custom-fs-6 fw-medium mb-2"
                  style={{ color: "var(--identity-color)" }}
                >
                  {useLang(
                    boradMember?.positionNameEn,
                    boradMember?.positionNameAr
                  )}
                </h2>
                <h2 className="custom-fs-4 fw-semibold">
                  {useLang(boradMember?.nameEn, boradMember?.nameAr)}
                </h2>
              </div>
            </div>

            {/* bio container */}
            <div className="mb-5">
              <h2 className="custom-fs-5 fw-bold mb-3">
                {useLang("bio", "أبرز المعلومات")}
              </h2>

              <div className="danger-html" dangerouslySetInnerHTML={{ __html: useLang(boradMember?.resumeHighLightEn || "-", boradMember?.resumeHighLightAr || "-") }} />
            </div>

            {/* key dates container*/}
            <div>
              <h2 className="custom-fs-5 fw-bold mb-3">
                {useLang("key dates", "أهم التواريخ")}
              </h2>

              <div className="overflow-auto">
                <table className="w-100 fs-6" style={{ minWidth: "900px" }}>
                  <thead
                    style={{
                      backgroundColor: "var(--identity-color)",
                      color: "var(--white-color)",
                    }}
                  >
                    <tr className="text-capitalize">
                      <CustomTd
                        textCenter={false}
                        label={useLang("company name", "الشركة")}
                        style={{ minWidth: "200px" }}
                      />
                      <CustomTd
                        label={useLang("company position name", "المنصب")}
                      />
                      <CustomTd label={useLang("started on", "من")} />
                      <CustomTd label={useLang("Ended  on", "إلي")} />
                    </tr>
                  </thead>

                  <tbody>
                    {boradMember?.positionHistory?.map((item, idx) => (
                      <tr
                        key={idx}
                        style={{ color: "var(--second-black-color)" }}
                      >
                        <CustomTd
                          textCenter={false}
                          label={useLang(
                            item?.companyNameEn,
                            item?.companyNameAr
                          )}
                          style={{ minWidth: "200px" }}
                        />
                        <CustomTd
                          label={useLang(
                            item?.positionNameEn,
                            item?.positionNameAr
                          )}
                        />
                        <CustomTd label={item?.startedOn || "-"} />
                        <CustomTd label={item?.endedOn || "-"} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
