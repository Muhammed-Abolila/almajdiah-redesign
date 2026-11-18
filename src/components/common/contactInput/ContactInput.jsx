import "./ContactInput.css"
const ContactInput = ({  type, value,checked, placeholder, label, error,onChange }) => {
  return (
    <div className="position-relative">

      {type == "checkbox" && (
        <label
          className="form-check-label cursor-pointer"
          htmlFor="exampleCheck1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        checked={checked}
        className={`${
          type == "checkbox"
            ? "form-check-input cursor-pointer"
            : "form-control py-3 rounded-5 "
        }`}
        style={{ borderColor: error && "var(--fail-color)" }}
        aria-describedby="emailHelp"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && type !== "checkbox" && (
        <i className="error-icone bi bi-exclamation-circle position-absolute" />
      )}


    </div>
  );
};

export default ContactInput;
