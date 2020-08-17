import React, { useState, useEffect } from 'react';
import firebase from '../../firebase-config';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import Image from '../../components/image/image';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import logo from '../../assets/logo.svg';
import exit from '../../assets/exit.svg';
import OrderHistory from '../../components/menu/OrderHistory';
import './Kitchen.css';

const orderOption = {
  fadeAway: true,
  fadeAwayTimeout: 2000,
};

const Kitchen = () => {
  const [done, setDone] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .orderBy('created_at', 'desc')
      .get()
      .then((snapshot) => {
        const kitchenOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        filterBy(setPending, 'pending', kitchenOrders);
        filterBy(setDone, 'done', kitchenOrders);
      });
  }, []);

  const filterBy = (state, status, array) => {
    state(array.filter((doc) => doc.ready === status));
  };

  const orderDone = (item) => {
    firebase.firestore().collection('orders').doc(item.id).update({
      ready: 'done',
      updated_at: new Date().getTime(),
    });

    const newPending = pending.filter((el) => el.id !== item.id);
    setPending(newPending);

    done.unshift({ ...item, ready: 'done', updated_at: new Date() });
    setDone(done);

    growl.success({ text: 'Pedido pronto!', ...orderOption });
  };

  const time = (readyTime, finalTime) => {
    const diffTime = finalTime - readyTime;
    const minuts = diffTime / 1000 / 60;
    if (minuts <= 60) {
      return `Pedido entregue em ${Math.abs(Math.round(minuts))} min`;
    } else {
      const hours = diffTime / 1000 / 60 / 60;
      return `Pedido entregue em ${Math.abs(Math.round(hours))} horas`;
    }
  };

  return (
    <div className='div-kitchen'>
      <nav className='nav-kitchen'>
        <figure className='figure-kitchen'>
          <Image src={logo} alt='logo' class='logo-kitchen' />
        </figure>
        <h1 className='h1-kitchen'>BURGER QUEEN</h1>
        <Link to='/login'>
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
            {pending.map((item) => (
              <div key={item.id} className='container-order'>
                <OrderHistory
                  table={item.table}
                  name={item.name}
                  order={item.order.map((i, index) => (
                    <div key={index}>
                      {i.item}:{i.count}
                    </div>
                  ))}
                />
                <Button
                  name='PRONTO'
                  onClick={(e) => {
                    orderDone(item);
                    e.preventDefault();
                  }}
                  title={'Pedido Pronto'}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='div-orderFinished'>
          <h1 className='h1-orders'>PEDIDOS PRONTOS</h1>
          <div>
            <div>
              {done.map((item) => (
                <div key={item.id} className='container-order'>
                  <OrderHistory
                    sendTime={time(item.created_at, item.updated_at)}
                    table={item.table}
                    name={item.name}
                    order={item.order.map((i, index) => (
                      <div key={index}>
                        {i.item}:{i.count}
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
