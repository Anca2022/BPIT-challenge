import titleCase from "../../utils/titleCase";
import { InputFieldProps } from "../../types/Props";

export default function ModalInputField({
  labelDescription,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={labelDescription}>{titleCase(labelDescription)}</label>
      <div className="input-field">
        <input
          id={labelDescription}
          type={type}
          step="0.01"
          min="0"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}
