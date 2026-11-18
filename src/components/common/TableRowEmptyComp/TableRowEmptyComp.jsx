const TableRowEmptyComp = ({text,colspan}) => {
  return (
    <tr>
      <td
        colSpan={colspan}
        className="text-center align-middle text-capitalize fs-4 "
        style={{ height: "200px" }}
      >
        {text}
      </td>
    </tr>
  );
};

export default TableRowEmptyComp;
