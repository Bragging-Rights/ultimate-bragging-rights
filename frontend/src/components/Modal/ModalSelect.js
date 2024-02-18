import "./ModalInput.css";

const ModalSelect = (props) => {
  const { label, name, onChange, options } = props;
  return (
    <div className="element-container">
      <div>
        <label className="input-label">{label}</label>
      </div>
      <select onChange={onChange} name={name}>
        {options?.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ModalSelect;
