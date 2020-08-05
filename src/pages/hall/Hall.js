import React, { useState, useEffect } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Menu from "../../components/menu/Menu";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import logo from "../../assets/logo.svg";
import exit from "../../assets/exit.svg";
import line from "../../assets/line.svg";
import Modal from "../../components/modal/modal";
import Kitchen from "../kitchen/Kitchen";
import "./Hall.css";

const Hall = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameCustomer, setNameCustomer] = useState("");
  const [numberTable, setNumberTable] = useState("");
  const [menu, setMenu] = useState("breakfast");
  const [breakfast, setBreakfast] = useState({});
  const [brunch, setBrunch] = useState({});
  const [resume, setResume] = useState("");
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const getMenu = ({ name, state }) => {
    firebase
      .firestore()
      .collection("products")
      .doc(name)
      .get()
      .then((docRef) => {
        const itemData = docRef.data();
        state(() => itemData);
      });
  };

  useEffect(() => {
    getMenu({ name: "breakfast", state: setBreakfast });
  }, []);
  const allBrunch = (e) => {
    setMenu(e.target.value);
    getMenu({ name: "brunch", state: setBrunch });
  };

  const handleAddItem = (e) => {
    const item = e.currentTarget.parentElement.firstChild.innerText;
    const price = parseFloat(
      e.currentTarget.parentElement.children[1].innerText.replace("R$ ", "")
    );

    const itemIndex = order.findIndex((el) => el.item === item);
    if (itemIndex === -1) {
      setOrder([...order, { item, count: 1 }]);
    } else {
      const newOrder = [...order];
      newOrder[itemIndex].count += 1;
      setOrder(newOrder);
    }

    setTotal(total + price);
  };

  const handleRemoveItem = (e) => {
    const item = e.currentTarget.parentElement.firstChild.innerText;
    const price = parseFloat(
      e.currentTarget.parentElement.children[1].innerText.replace("R$ ", "")
    );

    const itemIndex = order.findIndex((el) => el.item === item);

    if (itemIndex === -1) {
      return;
    }

    const count = order[itemIndex].count;
    const delItem = order.filter((elem) => elem.item !== item);

    setOrder([...delItem]);
    setTotal(total - price * count);
  };

  const handleSubtractItem = (e) => {
    const item = e.currentTarget.parentElement.firstChild.innerText;
    const price = parseFloat(
      e.currentTarget.parentElement.children[1].innerText.replace("R$ ", "")
    );

    const itemIndex = order.findIndex((el) => el.item === item);

    if (itemIndex === -1 || total === 0) {
      return;
    }

    const itemCount = order[itemIndex];
    const count = itemCount.count;

    if (itemCount === 1) {
      const delItem = order.filter((elem) => elem !== itemCount.item);
      setOrder([...delItem]);
      setTotal(total - price * count);
    } else {
      itemCount.count -= 1;
      setOrder([...order]);
      setTotal(total - price);
    }
  };

  const sendOrders = (e) => {
    e.preventDefault();
    const sendOrder = {
      name: nameCustomer,
      table: numberTable,
      order: order,
      ready: "pending",
      created_at: new Date(),
      updated_at: null,
    };
    firebase.firestore().collection("orders").add(sendOrder);
  };

  return (
    <div className='div-hall'>
      <header className='header-hall'>
        <figure className='figure-logo'>
          <Image src={logo} alt='logo' class='logo-hall' />
        </figure>
        <div className='div-name'>
          <h1 className='h1-hall'>BURGER QUEEN</h1>
          <figure className='figure-line'>
            <Image src={line} alt='line' class='line-hall' />
          </figure>
        </div>
        <button
          className='button-exit'
          name='EXIT'
          onClick={() => firebase.auth().signOut()}
        >
          <Image src={exit} alt='exit' class='exit-image' />
        </button>
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>{<Kitchen />}</Modal>
        ) : null}
      </header>
      <div className='div-init'>
        <Input
          name='name-customer'
          class='input-service'
          type='text'
          value={nameCustomer}
          onChange={(e) => setNameCustomer(e.target.value)}
          placeholder='Nome Cliente'
        />
        <Input
          name='number-table'
          class='input-service'
          type='text'
          value={numberTable}
          onChange={(e) => setNumberTable(e.target.value)}
          placeholder='N° Mesa'
        />
      </div>
      <section className='section-hall'>
        <div className='div-option'>
          <div className='b-food'>
            <Button
              name='CAFÉ DA MANHÃ '
              class='button-hall b-type'
              type='text'
              value='breakfast'
              onClick={(e) => setMenu(e.target.value)}
            />
            <Button
              name='ALMOÇO/ JANTAR'
              class='button-hall b-type'
              type='text'
              value='brunch'
              onClick={allBrunch}
            />
          </div>

          <div className='itens-menu'>
            <Menu
              type={menu}
              class='button-hall'
              items={menu === "breakfast" ? breakfast : brunch}
              addItem={handleAddItem}
              removeItem={handleRemoveItem}
              subtractItem={handleSubtractItem}
            />
          </div>
        </div>
        <div className='div-resume'>
          <Button
            name='RESUMO'
            class='button-hall'
            type='text'
            value={resume}
            onClick={(e) => setResume(e.target.value)}
          />
          <div className='resume-order'>
            {order.map((orderItem) => (
              <div className='itens-resume'>
                <div className='item-order'>
                  Item: {orderItem.item}
                  <br></br>
                  Qtde: {orderItem.count}
                </div>
              </div>
            ))}
          </div>
          <div className='finish-order'>
            <span className='total-price'>TOTAL:R$ {total}</span>
            <Button class='button-hall-end' name='CANCELAR' />
            <Button
              class='button-hall-end'
              name='ENVIAR'
              type='submit'
              onClick={(e) => sendOrders(e)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hall;
