import React from "react";

const MenuItem = (props) => {
  return (
    <div className='card'>
      <div className='container'>
        <h4>
          <b>{props.name}</b>
        </h4>
        <p>R$ {props.price.toFixed(2)}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleClick(e);
          }}
          id='add'
        >
          ADD
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleSubtractItem(e);
          }}
          id='sub'
        >
          SUB
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleRemoveItem(e);
          }}
          id='rem'
        >
          REM
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
