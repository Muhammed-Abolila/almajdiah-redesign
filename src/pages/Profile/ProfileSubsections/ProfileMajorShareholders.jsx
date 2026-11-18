import CustomTd from "../../../components/common/customTd/CustomTd";
import useLang from "../../../utils/useLang";
const ProfileMajorShareholders = () => {
  const tableHeaders = [
    { title: useLang("name", "الإسم") },
    { title: useLang("number of shares (m)", "عدد الأسهم (مليون)") },
    { title: useLang("holding", "نسبة الملكية") },
  ];
  return (
    <div className="space-between-sections">
      <h2 className="section-title mb-4">
        {useLang("major shareholders", "كبار المستثمرين")}
      </h2>

      <div className="overflow-auto">
        <table className="w-100 fs-6" style={{ minWidth: "650px" }}>
          <thead
            style={{
              backgroundColor: "var(--identity-color) !important",
              color: "var(--white-color)",
            }}
          >
            <tr className="text-capitalize">
              {tableHeaders.map((item, idx) => (
                <CustomTd
                  key={idx}
                  textCenter={idx != 0}
                  label={item.title}
                  style={{ minWidth: `${idx == 0 && "300px"}` }}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <CustomTd textCenter={false} label="Lorem ipsum dolor sit." />
              <CustomTd label="100"/>
              <CustomTd label="100" style={{width:"150px"}} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileMajorShareholders;
