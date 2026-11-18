const CustomTd = ({textCenter=true,label,style}) => {
  return (
    <td className={`py-3 ${textCenter&&"text-center"} text-capitalize`}  style={{ ...style, paddingInlineStart: "1rem" }}>
      {label}
    </td>
  );
};

export default CustomTd;
