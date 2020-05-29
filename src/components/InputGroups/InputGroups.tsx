import React from "react";
import "../InputGroups/InputGroups.css";

type InputGroupsProps = {
  type?: string;
  value?: React.ReactText;
  placeholder?: string;
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isError?: boolean;
  isErrorTitle?: string;
  labelTitle?: string;
};

const InputGroups: React.FC<InputGroupsProps> = ({
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  isError,
  isErrorTitle,
  labelTitle,
}) => {
  return (
    <div className="inputGroupsWrapper">
      <label className="inputGroupsLabel" htmlFor={labelTitle}>
        <strong>{labelTitle}</strong>
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={isError ? `inputGroups inputGroupsRed` : "inputGroups"}
      />
      {isError && <p className="errorTitle">{isErrorTitle}</p>}
    </div>
  );
};

export default InputGroups;
