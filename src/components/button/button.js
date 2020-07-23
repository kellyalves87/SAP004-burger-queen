import React from 'react';
import './button.css'

const Button = (props) => {
return <button id={props.id} className={props.class} type={props.type}>{props.name}</button>
}

export default Button;