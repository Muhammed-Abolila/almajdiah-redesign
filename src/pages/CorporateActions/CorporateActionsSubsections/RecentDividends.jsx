import useLang from "../../../utils/useLang"

const RecentDividends = () => {
  return (
    <div className="col-12 col-md-6 col-xl-6">
      <div>
        <h2 className="section-title mb-4">
          {useLang("recent dividends", "التغير في رأس المال")}
        </h2>
      </div>
      <div>
        {/* stock market  */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang("stock market:", "سوق التداول:")}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            {useLang("tasi", "تاسي")}
          </p>
        </div>
        {/* fiscal year end  */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang("fiscal year end:", "نهاية السنة المالية:")}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            {useLang("December", "ديسمبر")}
          </p>
        </div>
        {/* Free Float m  */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang("free float (m):", "الأسهم الحرة (مليون):")}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            23368
          </p>
        </div>

        {/* free float % */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang("free float %:", "الأسهم الحرة %:")}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            23368
          </p>
        </div>

        {/* weight in index %  */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang("weight in index %:", "وزن الشركة %:")}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            0.23
          </p>
        </div>

        {/* 3m average volume:  */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang(
              "3M average volume:",
              "متوسط حجم التداول (سهم) لآخر 3 أشهر:"
            )}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            225,001.25
          </p>
        </div>

        {/* 3m average transactions:  */}
        <div className="box-title">
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--text-color)" }}
          >
            {useLang(
              "3M average transactions:",
              "متوسط عدد الصفقات اليومية - آخر 3 أشهر:"
            )}
          </p>
          <p
            className="m-0 text-capitalize"
            style={{ color: "var(--black-color)" }}
          >
            225,001.25
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecentDividends
