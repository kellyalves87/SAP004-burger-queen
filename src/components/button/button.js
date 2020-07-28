import React from "react";

const Button = (props) => {
  return (
    <button
      id={props.id}
      className={props.class}
      type={props.type}
      onClick={props.onClick}
    >
      {props.name}
      {props.Price} {props.title}
    </button>
  );
};

export default Button;
