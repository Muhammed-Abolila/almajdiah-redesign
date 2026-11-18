import image from "../../../assets/testImage2.jpg";
import CustomLink from "../../../components/common/customLink/CustomLink";
import useLang from "../../../utils/useLang";
const Ratios = () => {
  return (
    <section className="space-between-sections">
      <div className="row row-gap-3 m-0">
        <div className="col-12 col-lg-6 order-0 order-lg-2">
          <div className="img-container">
            <img className="w-100 h-100" src={image} loading="lazy" />
          </div>
        </div>

        <div className="col-12 col-lg-6 order-1">
          <div className="h-100 d-flex flex-column justify-content-between align-items-start">
            <div>
              <h2
                className="section-title m-0"
                style={{
                  maxWidth: `${useLang("20rem", "100%")}`,
                  fontSize: "2rem",
                }}
              >
                {useLang(
                  "explore our financial ratios",
                  "إستكشف نسبناً المالية"
                )}
              </h2>
              <p
                className="mt-3 mt-lg-4 fw-normal"
                style={{ fontSize: "1.125rem", color: "var(--text-color)" }}
              >
                {useLang(
                  `
              Gain a clear view of our financial performance through key performance
            indicators and ratios, reflecting our commitment to transparency,
            stability, and sustainable growth
              `,

                  `
                  احصل على رؤية واضحة لأدائنا المالي من خلال مؤشرات الأداء الرئيسية والمُؤشرات المالية، التي تعكس التزامنا بالشفافية والاستقرار والنمو المستدام.`
                )}
              </p>
            </div>
            <CustomLink
              text={useLang("learn more", "المزيد")}
              link={`/${useLang("en", "ar")}/financial-information/ratios`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ratios;
