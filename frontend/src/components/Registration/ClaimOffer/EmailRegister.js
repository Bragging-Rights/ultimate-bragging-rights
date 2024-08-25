import "../../Modal/ModalInput.css";

const EmailModalInput = (props) => {
  const { label, name, onChange, value, placeholder, type = "text" } = props;
  return (
    <div className="element-container">
      <div>
        {/* <label className="star">*</label> */}
        <label className="input-label">{label}</label>
      </div>
      <input
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        style={{ width: "100%" }}
        disabled
      />
    </div>
  );
};

export default EmailModalInput;
