const CustomInput = ({ label, value, setValue, onClickFnc, btnLabel }) => {
  return (
    <div className="d-flex align-items-end gap-2 mt-5">
      <div
        className="input-container d-flex flex-column justify-content-between gap-2 w-100"
        style={{ maxWidth: "250px" }}
      >
        <label htmlFor="input" className="text-capitalize">
          {label}
        </label>
        <input
          type="text"
          id="input"
          className="form-control rounded-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        className="btn rounded-0 word-nowrap "
        style={{
          color: "var(--white-color)",
          backgroundColor: "var(--identity-color)",
        }}
        onClick={() => onClickFnc()}
      >
        {btnLabel}
      </button>
    </div>
  );
};

export default CustomInput;
