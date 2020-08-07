import React from "react";
import Image from "../../components/image/image";
import add from "../../assets/add.svg";
import remove from "../../assets/remove.svg";
import subtract from "../../assets/subtract.svg";
import "./MenuItem.css";

const MenuItem = (props) => {
  return (
    <div className='card'>
      <div className='container-menu'>
        <h4>
          <b className='item-name'>{props.name}</b>
        </h4>
        <p className="price">R$ {props.price.toFixed(2)}</p>

        <button
          className='btn-item'
          onClick={(e) => {
            e.preventDefault();
            props.handleClick(e);
          }}
          id='add'
        >
          <Image src={add} alt='add' class='icons-item' />
        </button>

        <button
          className='btn-item'
          onClick={(e) => {
            e.preventDefault();
            props.handleSubtractItem(e);
          }}
          id='sub'
        >
          <Image src={subtract} alt='subtract' class='icons-item' />
        </button>

        <button
          className='btn-item'
          onClick={(e) => {
            e.preventDefault();
            props.handleRemoveItem(e);
          }}
          id='rem'
        >
          <Image src={remove} alt='remove' class='icons-item' />
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
