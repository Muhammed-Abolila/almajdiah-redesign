import SkeletonCard from "../../../components/ui/SkeletonCard/SkeletonCard";
import useLang from "../../../utils/useLang";
const BasicInfo = ({ data, isLoading }) => {
  return (
    <div className="col-12 col-lg-5 col-xxl-4 ">
      <div>
        <h2 className="section-title mb-4 word-nowrap">
          {useLang("basic information", "المعلومات الأساسية")}
        </h2>
      </div>
      {isLoading ?
        <SkeletonCard />
        :
        <>
          {/* city */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("city:", "المدينة:")}
            </p>
            <p className="m-0" style={{ color: "var(--black-color)" }}>
              {useLang(data?.cityNameEn, data?.cityNameAr)}
            </p>
          </div>
          {/* country */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("country:", "الدولة:")}
            </p>
            <p className="m-0" style={{ color: "var(--black-color)" }}>
              {useLang("saudi arabia", "المملكه العربية السعودية")}
            </p>
          </div>

          {/* ownership type */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("ownership type:", "نوع الملكية:")}
            </p>
            <p className="m-0" style={{ color: "var(--black-color)" }}>
              {useLang(data?.ownershipTypeNameEn, data?.ownershipTypeNameAr)}
            </p>
          </div>

          {/* establishment date */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("establishment date:", "تاريخ التأسيس:")}
            </p>
            <p className="m-0" style={{ color: "var(--black-color)" }}>
              {data?.establishedOnYear}
            </p>
          </div>

          {/* establishment date */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("commercial register:", "السجل التجاري:")}
            </p>
            <p className="m-0" style={{ color: "var(--black-color)" }}>
              1010417874
            </p>
          </div>

          {/*website*/}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("website:", "الموقع:")}
            </p>
            <a
              className="m-0 text-decoration-none"
              href={`https://${data?.websiteURL}`}
              target="_blank"
              style={{ color: "var(--black-color)" }}
            >
              {data?.websiteURL}
            </a>
          </div>

          {/* email */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("email:", "البريد الإلكتروني:")}
            </p>
            <a
              href={`mailto:${data?.email}`}
              style={{ color: "var(--black-color)" }}
              className="text-decoration-none"
            >
              {data?.email}
            </a>
          </div>

          {/* phone */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("phone:", "الهاتف:")}
            </p>
            <a
              dir="ltr"
              href={`tel:${data?.phone}`}
              style={{ color: "var(--black-color)" }}
              className="text-decoration-none"
            >
              {data?.phone}
            </a>
          </div>
          {/* fax */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("fax:", "الفاكس:")}
            </p>
            <p dir="ltr" style={{ color: "var(--black-color)" }}>
              {data?.fax}
            </p>
          </div>

          {/* PO box */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("PO box:", "صندوق البريد:")}
            </p>
            <p dir="ltr" style={{ color: "var(--black-color)" }}>
              {data?.poBoxEn}
            </p>
          </div>

          {/* address */}
          <div className="box-title">
            <p
              className="m-0 text-capitalize"
              style={{ color: "var(--text-color)" }}
            >
              {useLang("address:", "العنوان:")}
            </p>
            <p className="m-0" style={{ color: "var(--black-color)" }}>
              {useLang(data?.addressEn, data?.addressAr)}
            </p>
          </div>
        </>
      }

    </div>
  );
};

export default BasicInfo;
