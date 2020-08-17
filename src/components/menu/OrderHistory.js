import React from "react";

const OrderHistory = (props) => {
  return (
    <header>
      <div className='client-info'>
        <p> Mesa: {props.table} </p>
        <p> Cliente: {props.name} </p>
      </div>
      <span>{props.sendTime} </span>
      {props.order}
    </header>
  );
};

export default OrderHistory;
