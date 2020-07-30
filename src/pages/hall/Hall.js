import React, { useState, useEffect } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
// import growl from "growl-alert";
// import "growl-alert/dist/growl-alert.css";
import Menu from "../../components/menu/Menu";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import logo from "../../assets/logo.svg";
import exit from "../../assets/exit.svg";
import line from "../../assets/line.svg";
import "./Hall.css";

const Hall = () => {
  const [startService, setStartService] = useState("");
  const [numberTable, setNumberTable] = useState(0);
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
      //adicionar novo
      setOrder([...order, { item, count: 1 }]);
    } else {
      //adicionar já existente
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

    if (itemIndex === -1) {
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

  useEffect(() => {
    getMenu({ name: "breakfast", state: setBreakfast });
  }, []);

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
          onClick={() => firebase.auth().signOut()}>
          <Image src={exit} alt='exit' class='exit-image' />
        </button>
      </header>
      <div className='div-init'>
        <label className='label-service' />
        INICIAR ATENDIMENTO
        <Input
          name='start-service'
          class='input-service'
          type='text'
          value={startService}
          onChange={(e) => setStartService(e.target.value)}
          placeholder='Nome Cliente'
        />
        <label className='label-service' />
        NÚMERO MESA
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
            <span>TOTAL: {total}</span>
          <div className='resume-order'></div>
          <div className='finish-order'>
            <Button class='button-hall' name='CANCELAR' />
            <Button class='button-hall' name='ENVIAR' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hall;
