import React, { useState, useEffect } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Button from "../../components/button/button";
import logo from "../../assets/logo.svg";
import Image from "../../components/image/image";
import exit from "../../assets/exit.svg";
import "./Kitchen.css";
// import Order from "../../components/menu/order";
// import OrderItem from "../../components/menu/OrderItem";
import OrderHistory from "../../components/menu/OrderHistory";

const Kitchen = () => {
  const [done, setDone] = useState([]);
  const [pending, setPending] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .orderBy("created_at", "desc")
      .get()
      .then((snapshot) => {
        const pedidos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(pedidos);

        setPending(pedidos.filter((doc) => doc.status === false));
        setDone(pedidos.filter((doc) => doc.status === true));
      });
  }, []);

  function orderDone(item) {
    firebase.firestore().collection("orders").doc(item.id).update({
      ready: "done",
      updated_at: new Date(),
    });
    console.log("foi");

    const newDone = [
      ...done,
      { ...item, ready: "done", updated_at: new Date().getTime() },
    ];
    setDone(newDone);
  }

  // function orderHistory(item){

  // }

  return (
    <div className='div-kitchen'>
      <nav className='nav-kitchen'>
        <figure className='figure-kitchen'>
          <Image src={logo} alt='logo' class='logo-kitchen' />
        </figure>
        <h1 className='h1-kitchen'>BURGER QUEEN</h1>
        <button
          className='button-exit'
          name='EXIT'
          onClick={() => firebase.auth().signOut()}
        >
          <Image src={exit} alt='exit' class='exit-image' />
        </button>
      </nav>
      <section className='section-kitchen'>
        <div className='div-orderRecived'>
          <h1 className='h1-orders'>PEDIDOS PENDENTES</h1>
          <div>
            {orders.map((item) => (
              <div className='div-order1'>
                <Button
                  name='PRONTO'
                  onClick={(e) => {
                    orderDone(item);
                    e.preventDefault();
                  }}
                />
                {item.name}
                {item.order.map((i) => (
                  <div>
                    {i.count}
                    {i.item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className='div-orderFinished'>
          <h1 className='h1-orders'>PEDIDOS PRONTOS</h1>
          <div>
            <div>
              {done.map((item) => (
                <div key={item.id}>
                  <OrderHistory
                    table={item.table}
                    name={item.name}
                    order={item.order.map((i) => (
                      <div>
                        {i.count}
                        {i.item}
                      </div>
                    ))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kitchen;
