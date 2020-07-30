import React from "react";
import './MenuItem.css'

const MenuItem = (props) => {
  return (
    <div className='card'>
      <div className='container-menu'>
        <h4>
          <b className='item-name'>{props.name}</b>
        </h4>
        <p>R$ {props.price.toFixed(2)}</p>
        <button
        className='btn-item'
          onClick={(e) => {
            e.preventDefault();
            props.handleClick(e);
          }}
          id='add'
        >
          Adicionar
        </button>
        <button
        className='btn-item'
          onClick={(e) => {
            e.preventDefault();
            props.handleSubtractItem(e);
          }}
          id='sub'
        >
          Subtrair
        </button>
        <button
        className='btn-item'
          onClick={(e) => {
            e.preventDefault();
            props.handleRemoveItem(e);
          }}
          id='rem'
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
