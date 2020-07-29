import React from "react";

const Button = (props) => {

  console.log('button', props)

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
