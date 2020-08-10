import React, { useState, useEffect } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Image from "../../components/image/image";
import {Link} from "react-router-dom";
import Button from "../../components/button/button";
import logo from "../../assets/logo.svg";
import exit from "../../assets/exit.svg";
import OrderHistory from "../../components/menu/OrderHistory"
import'./Kitchen.css'

const Kitchen = () => {
  const [done, setDone] = useState([]);
  const [pending, setPending] = useState([]);

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

        setPending(pedidos.filter((doc) => doc.ready === "pending"));
        setDone(pedidos.filter((doc) => doc.ready === "done"));
      });
  }, []);

  function orderDone(item) {
    firebase
      .firestore()
      .collection("orders")
      .doc(item.id)
      .update({
        ready: "done",
        updated_at: new Date().getTime(),
      })

    const newPending = pending.filter((el) => el.id !== item.id);
    setPending(newPending);

    const newDone = [...done, { ...item, ready: 'done', updated_at: new Date() }];
    setDone(newDone);
  };

  function time(readyTime, finalTime){
    const diffTime = finalTime - readyTime
    const teste = diffTime / 1000 / 60;
    if (teste <= 60) {
      return `Pedido entregue em ${Math.abs(Math.round(teste))} min`;
    } else {
      const teste2 = diffTime / 1000 / 60 / 60;
      return `Pedido entregue em ${Math.abs(Math.round(teste2))} horas`;
    }
  }

  return (
    <div className='div-kitchen'>
      <nav className='nav-kitchen'>
        <figure className='figure-kitchen'>
          <Image src={logo} alt='logo' class='logo-kitchen' />
        </figure>
        <h1 className='h1-kitchen'>BURGER QUEEN</h1>
        <Link to='/login' >
          <button
            className='button-exit'
            name='EXIT'
            onClick={() => firebase.auth().signOut()}
          >
            <Image src={exit} alt='exit' class='exit-image' />
          </button>
        </Link>
      </nav>
      <section className='section-kitchen'>
        <div className='div-orderRecived'>
          <h1 className='h1-orders'>PEDIDOS PENDENTES</h1>
          <div className='div1'>
            {pending.map((item) =>
              <div key={item.id} className='div2'>
                <OrderHistory
                  table={item.table}
                  name={item.name}
                  order={item.order.map((i, index) => (
                    <div key={index} >{i.count}
                      {i.item}
                    </div>))}
                />
                <Button
                  name='PRONTO'
                  onClick={(e) => {
                    orderDone(item);
                    e.preventDefault();
                  }}
                  title={"Pedido Pronto"}
                />
              </div>
            )}
          </div>
        </div>
        <div className='div-orderFinished'>
          <h1 className='h1-orders'>PEDIDOS PRONTOS</h1>
          <div>
            <div>
              {done.map((item) =>
                <div key={item.id} className='div2'>
                  <OrderHistory
                    sendTime={time(item.created_at, item.updated_at)}
                    table={item.table}
                    name={item.name}
                    order={item.order.map((i, index) => (
                      <div key={index}>{i.count}
                        {i.item}
                      </div>))}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kitchen;
