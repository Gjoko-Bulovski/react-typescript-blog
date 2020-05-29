import React from "react";
import "../Alert/Alert.css";

export type AlertProps = {
  type?: string;
  text?: string;
};

const Alert: React.FC<AlertProps> = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;

Alert.defaultProps = {
  type: "",
  text: "",
};
