import CustomTd from "../../../components/common/customTd/CustomTd";
import SkeletonTable from "../../../components/ui/SkeletonTable/SkeletonTable";
import { formatNumber } from "../../../utils/helper";
import useLang from "../../../utils/useLang";
const SubsidiariesAndAssociates = ({ data,isLoading }) => {
  const tableHeaders = [
    { title: useLang("company", "الشركة") },
    { title: useLang("country", "الدولة") },
    { title: useLang("percentage", "النسبه") },
  ];
  return (
    <div className="space-between-sections">
      <h2 className="section-title mb-4">
        {useLang(`Subsidiaries & Associates`, "الشركات التابعة والزميلة")}
      </h2>

      <div className="overflow-auto">
        {isLoading ?
          <SkeletonTable />
          :
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
              {data?.map((item, idx) => (
                <tr key={idx} style={{ color: "var(--second-black-color)" }}>
                  <CustomTd textCenter={false} label={useLang(item?.shortNameEn, item?.shortNameAr)} />
                  <CustomTd
                    label={useLang(item?.countryNameEn, item?.countryNameAr)}
                  />
                  <CustomTd label={`${formatNumber(item?.percentage)} %`} style={{ width: "150px" }} />
                </tr>
              ))}
            </tbody>
          </table>}
      </div>
    </div>
  );
};

export default SubsidiariesAndAssociates;
