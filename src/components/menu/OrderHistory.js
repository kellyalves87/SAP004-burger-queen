import React from 'react'

const OrderHistory = (props) => {
  return (
    <div>
      <div >
        <div > Mesa: {props.table} </div>
        <div > Cliente: {props.name} </div>
      </div>
      {/* <span >{props.sendTime} </span> */}
      {props.order}
    
      
    </div>
  )
};

export default OrderHistory