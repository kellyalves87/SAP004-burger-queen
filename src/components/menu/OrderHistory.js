import React from 'react'

const OrderHistory = (props) => {
  return (
    <div>
      <div >
        <div > Mesa: {props.table} </div>
        <div > Cliente: {props.name} </div>
      </div>
      <span >{props.sendTime} </span>
      {props.order}
      {/* <span >Recebido: {props.created_at} </span>
      <span >Entregue: {props.updated_at} </span>
      */}
    
      
    </div>
  )
};

export default OrderHistory