import React, { useState, useEffect } from "react";
import firebase from "../../../firebase-config"
import Button from '../../../components/button/button';
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import OrderHistory from "../../../components/menu/OrderHistory"
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import "./orders.css"




const option = {
  fadeAway: true,
  fadeAwayTimeout: 2000,
};

function OrderSent() {
  const [done, setDone] = useState([]);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy("created_at", "desc")
      .get().then((snapshot) => {
        const pedidos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDone(pedidos.filter(doc => doc.ready === 'done' && doc.status ===""))
        setDelivered(pedidos.filter(doc => doc.status === 'delivered'))
      })
  }, []);

  function orderDelivered(item) {
    firebase
      .firestore()
      .collection("orders")
      .doc(item.id)
      .update({
        updated_at: new Date().getTime(),
        status: "delivered",
      })

    const newDone = done.filter((el) => el.id !== item.id);
    setDone(newDone);

    const newDelivered = [...delivered, { ...item, status: 'delivered', updated_at: new Date() }];
    setDelivered(newDelivered);

    growl.success({ text: 'Pedido entregue!', ...option })
  };

  function time(readyTime, finalTime) {
    const diffTime = finalTime - readyTime
    const teste1 = diffTime / 1000 / 60;
    if (teste1 <= 60) {
      return `Entregue em ${Math.abs(Math.round(teste1))} min`;
    } else {
      const teste2 = diffTime / 1000 / 60 / 60;
      return `Entregue em ${Math.abs(Math.round(teste2))} horas`;
    }
  }


  return (
    <div className='container-orders'>
      <div className='orders'>
        <p className='order-state'>PEDIDOS PRONTOS</p>
        <div >
          {done.map((item) =>
            <div key={item.id} className='container-order'>
              <OrderHistory
                table={item.table}
                name={item.name}
                order={item.order.map((i, index) => (
                  <div key={index}>{i.count}
                    {i.item}
                  </div>))}
              />
              <Button
                name='ENTREGAR'
                onClick={(e) => {
                  orderDelivered(item)
                  e.preventDefault()
                }}
                title={'Pedido Entregue'}
              />
            </div>
          )}
        </div>
      </div>

      <div className='orders'>
        <p className='order-state'>PEDIDOS ENTREGUES</p>
        <div>
          {delivered.map((item) =>
            <div key={item.id} className='container-order'>
              <OrderHistory
                sendTime={time(item.created_at, item.updated_at)}
                table={item.table}
                name={item.name}
                order={item.order.map((i, index) => (
                  <div key={index}>                    
                    {i.count}  
                    {i.item}
                  </div>))}
              />
              <p>Total: {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default OrderSent;