import cx from "classnames";
import style from "./agGrid.module.css";

interface RadioButtonGroupProps {
  value: string | null;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Common Radio Button Group component
export default function RadioButtonGroup({
  value,
  name,
  onChange,
}: RadioButtonGroupProps) {
  return (
    <div className={style.radioButtonGroup}>
      <label
        className={cx(style.radioButton, value === "N" ? style.selected : "")}
      >
        <input
          type="radio"
          name={name}
          value="N"
          checked={value === "N"}
          onChange={onChange}
          readOnly={!onChange}
        />
        X
      </label>
      <label
        className={cx(style.radioButton, value === "Y" ? style.selected : "")}
      >
        <input
          type="radio"
          name={name}
          value="Y"
          checked={value === "Y"}
          onChange={onChange}
          readOnly={!onChange}
        />
        O
      </label>
      <label
        className={cx(style.radioButton, value === null ? style.selected : "")}
      >
        <input
          type="radio"
          name={name}
          value=""
          checked={value === null}
          onChange={onChange}
          readOnly={!onChange}
        />
        선택
      </label>
    </div>
  );
}
