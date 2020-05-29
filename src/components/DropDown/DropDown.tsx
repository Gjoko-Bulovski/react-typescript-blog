import React from "react";
import "../DropDown/DropDown.css";

type DropDownProps = {
  show: boolean;
  value: string;
  handleToggleAuthor: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const DropDown: React.FC<DropDownProps> = ({
  show,
  value,
  handleToggleAuthor,
  handleBlur,
  children,
}) => {
  return (
    <div className="dropdown-container">
      <label className="arrow">
        <input
          type="button"
          value={value}
          className="dropdown-btn"
          onClick={handleToggleAuthor}
          onBlur={handleBlur}
        />
      </label>
      <ul className="dropdown-list" hidden={!show}>
        {children}
      </ul>
    </div>
  );
};

export default DropDown;
