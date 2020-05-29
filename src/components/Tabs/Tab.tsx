import React from "react";

type TabProps = {
  children?: React.ReactNode;
  label?: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;
