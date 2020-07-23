import React from 'react';
// import './Input.css'

const Input = (props) => {
  return <input type={props.type} id={props.id} className={props.class} placeholder={props.placeholder} name={props.name}></input>
}

export default Input;