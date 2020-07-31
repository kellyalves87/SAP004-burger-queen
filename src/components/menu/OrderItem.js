import React from "react";
import './MenuItem.css'

const OrderItem = (props) => {
  return (
    <div className=''>
      <div className=''>
        <h4>
          <b className='item-name'>{props.name}</b>
        </h4>
        {Object.entries(props.items).map((item) => {
        return (
          <OrderItem
            key={item[0]}
            count={item[0]}  
            item={item[1]}      
            />
        );
      })}
        <button
        className='btn-order'
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

export default OrderItem;