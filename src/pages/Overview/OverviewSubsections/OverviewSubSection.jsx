import useLang from "../../../utils/useLang";

const OverviewSubSection = () => {
  return (
    <div
      className={`overview row row-gap-2 mt-5 text-center ${useLang(
        "text-md-start",
        "text-md-end"
      )} text-capitalize`}
    >
      <h2 className="custom-fs-3 fw-semibold col-12 col-md-5">
        {useLang(
          `
          welcome to almajdiah’s investor relations center`,
          `
          مرحبًا بكم في مركز علاقات المستثمرين لشركة الماجدية
          `
        )}
      </h2>
      <div className="desc col-12 col-md-7" style={{fontSize:"18px"}}>
        {useLang(
          `Dar Al Majed Real Estate Co. (Almajdiah), recently listed on the Saudi
          Exchange, is committed to transparency and long-term value creation
          for its shareholders. Our Investor Relations platform provides timely
          information on financial performance, corporate governance, and
          strategic initiatives, keeping our stakeholders informed as we grow in
          the real estate sector.`,
          `
مرحبًا بكم في مركز علاقات المستثمرين لشركة الماجدية
تلتزم شركة دار الماجد العقارية (الماجدية)، المدرجة حديثًا في السوق المالية السعودية، بالشفافية وبتحقيق قيمة مستدامة وطويلة الأمد لمساهميها.
توفر منصّة علاقات المستثمرين لدينا معلومات دقيقة وفي الوقت المناسب حول الأداء المالي، والحوكمة المؤسسية، والمبادرات الاستراتيجية، بهدف إبقاء أصحاب المصلحة على اطلاع دائم مع استمرار نمونا في قطاع العقارات.
          `
        )}
      </div>
    </div>
  );
};

export default OverviewSubSection;
