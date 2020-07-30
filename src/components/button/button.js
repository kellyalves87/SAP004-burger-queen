import React from "react";

const Button = (props) => {
  return (
    <button
      id={props.id}
      className={props.class}
      type={props.type}
      onClick={props.onClick}
      value={props.value}
    >
      {props.name}
      {props.price}
    </button>
  );
};

export default Button;
