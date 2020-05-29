import React from "react";

type TabsProps = {
  children?: any;
  activeIndex?: any;
  label?: string;
  onClick: any;
  disabled?: boolean;
};

const Tabs: React.FC<TabsProps> = (props) => {
  let tabs = React.Children.map(props.children, (child, index) => {
    let style = props.activeIndex === index ? activeLabel : label;
    return (
      <button
        style={style}
        disabled={props.disabled}
        onClick={() => props.onClick(index)}
        className="btn"
      >
        {child.props.label}
      </button>
    );
  });

  return (
    <>
      <div>{tabs}</div>
      {props.children[props.activeIndex]}
    </>
  );
};

export default Tabs;

Tabs.defaultProps = {
  label: "",
};

let label = {
  font: "inherit",
  padding: "5px 10px",
  display: "inline-block",
  border: "none",
  borderBottom: "solid 2px transparent",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  outline: "none",
  background: "none",
  color: "#ccc",
};

let activeLabel = {
  ...label,
  borderBottom: "2px solid #000",
  color: "#000",
};
