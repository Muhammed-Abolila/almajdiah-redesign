import useLang from "../../utils/useLang";
import email from "../../assets/contact/email.png";
import website from "../../assets/contact/website.png";
import postalBox from "../../assets/contact/postalBox.png";
import location from "../../assets/contact/location.png";
import phone from "../../assets/contact/phone.png";
import useRequest from "../../utils/useRequest";
import { API_ENDPOINTS } from "../../services/apis";
import "./Contact.css";
import ContactForm from "./ContactSubsections/ContactForm";
import SkeletonCard from "../../components/ui/SkeletonCard/SkeletonCard";
const Contact = () => {
  const { data: profileData, isLoading } = useRequest(
    [API_ENDPOINTS.PROFILE.KEY],
    API_ENDPOINTS.PROFILE.URL
  );
  return (
    <section className="contact container space-between-sections">
      <h2 className="section-title">
        {useLang(
          `
         contact investor relations`,
          `
          تواصل مع علاقات المستثمرين
          `
        )}
      </h2>
      <p className="m-0" style={{ color: "var(--text-color)" }}>
        {useLang(
          `Almajdiah is pleased to assist investors and shareholders with their inquiries. Please reach out through the following channels`,
          `
              يسر شركة المجدية أن تساعد المستثمرين والمساهمين في استفساراتهم.
            يرجى التواصل من خلال القنوات التالية.`
        )}
      </p>
      <div className="row mt-5">
        {isLoading ?
          <SkeletonCard className="col-12 col-md-6 mt-4" />
          :
          <div className="col-12 col-md-6 mt-4">
            <div>
              <h3 className="section-title mt-0 pt-0">
                {useLang(`investor relations`, `علاقات المستثمرين`)}
              </h3>

              {/* email */}
              <div className="row mt-4 custom-fs-6 fw-normal">
                <div className="col-4 col-md-5 col-lg-4 d-flex align-items-center gap-2 text-capitalize">
                  <img
                    src={email}
                    style={{ width: "18px", height: "18px" }}
                    alt=""
                  />
                  <span style={{ color: "var(--text-color)" }}>
                    {useLang("email:", "البريد الإلكتروني:")}
                  </span>
                </div>
                <div className="col-8 col-md-7">
                  <a
                    href={`mailto:${profileData?.profileInfo?.email}`}
                    style={{ color: "var(--black-color)" }}
                    className="text-decoration-none "
                  >
                    {profileData?.profileInfo?.email}
                  </a>
                </div>
              </div>
              {/* phone  */}
              <div className="row mt-4 custom-fs-6 fw-normal">
                <div className="col-4 col-md-5 col-lg-4 d-flex align-items-center gap-2 text-capitalize">
                  <img
                    src={phone}
                    style={{ width: "17px", height: "17px" }}
                    alt=""
                  />
                  <span style={{ color: "var(--text-color)" }}>
                    {useLang("telephone:", "الهاتف:")}
                  </span>
                </div>
                <div className="col-8 col-md-7">
                  <a
                    dir="ltr"
                    href={`tel:${profileData?.profileInfo?.phone}`}
                    style={{ color: "var(--black-color)" }}
                    className="text-decoration-none"
                  >
                    {profileData?.profileInfo?.phone}
                  </a>
                </div>
              </div>
              {/* location  */}
              <div className="row mt-4 custom-fs-6 fw-normal row-gap-1">
                <div className="col-4 col-md-5 col-lg-4 d-flex align-items-center gap-2 text-capitalize">
                  <img
                    src={location}
                    style={{ width: "17px", height: "20px" }}
                    alt=""
                  />
                  <span style={{ color: "var(--text-color)" }}>
                    {useLang("location:", "العنوان:")}
                  </span>
                </div>
                <div className="col-12 col-sm-8 col-md-12 col-lg-7">
                  <p style={{ color: "var(--black-color)" }} className="m-0 ">
                    {useLang(
                      profileData?.profileInfo?.addressEn,
                      profileData?.profileInfo?.addressAr
                    )}
                  </p>
                </div>
              </div>
              {/* po box */}
              <div className="row mt-4 custom-fs-6 fw-normal">
                <div className="col-4 col-md-5 col-lg-4  d-flex align-items-center gap-2 text-capitalize">
                  <img
                    src={postalBox}
                    style={{ width: "15px", height: "15px" }}
                    alt=""
                  />
                  <span style={{ color: "var(--text-color)" }}>
                    {useLang("PO Box:", "صندوق البريد:")}
                  </span>
                </div>
                <div className="col-8 col-md-7">
                  <p style={{ color: "var(--black-color)" }} className="m-0">
                    {profileData?.profileInfo?.poBoxEn}
                  </p>
                </div>
              </div>
              {/* website  */}
              <div className="row mt-4 custom-fs-6 fw-normal">
                <div className="col-4 col-md-5 col-lg-4 d-flex align-items-center gap-2 text-capitalize">
                  <img
                    src={website}
                    style={{ width: "18px", height: "18px" }}
                    alt=""
                  />
                  <span style={{ color: "var(--text-color)" }}>
                    {useLang("website:", "الموقع:")}
                  </span>
                </div>
                <div className="col-8 col-md-7">
                  <a
                    className="text-decoration-none"
                    href={`https://${profileData?.profileInfo?.websiteURL}`}
                    target="_blank"
                    style={{ color: "var(--black-color)" }}
                  >
                    {profileData?.profileInfo?.websiteURL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="col-12 col-md-6 mt-4">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
