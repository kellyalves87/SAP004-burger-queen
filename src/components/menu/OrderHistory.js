import React from 'react';

const OrderHistory = (props) => {
  return (
    <div>
      <div className='client-info'>
        <div> Mesa: {props.table} </div>
        <div> Cliente: {props.name} </div>
      </div>
      <span>{props.sendTime} </span>
      {props.order}
    </div>
  );
};

export default OrderHistory;
