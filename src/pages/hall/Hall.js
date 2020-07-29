import React, { useState, useEffect } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
// import growl from "growl-alert";
// import "growl-alert/dist/growl-alert.css";
// import { Link } from "react-router-dom";
// import Menu from '../../components/menu/Menu';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import logo from "../../assets/logo.svg";
import line from "../../assets/line.svg";
import './Hall.css'

const Hall = () => {
  const [category, setCategory] = useState('Café da Manhã')
  const [startService, setStartService] = useState("");
  const [numberTable, setNumberTable] = useState(0);
  const [menu, setMenu] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [brunch, setBrunch] = useState([]);
  const [resume, setResume] = useState("");

  useEffect(() => {
    firebase.firestore()
      .collection("products")
      .get()
      .then((querySnapshot) => {
        const getMenu = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBreakfast(getMenu.filter(doc => doc.Category === 'breakfast'));
        setBrunch(getMenu.filter(doc => doc.Category === 'brunch'));
        
        console.log(getMenu);
      });
  }, []);


  return (
    <div className='div-hall'>
      {/* <Link to='/login'> */}
      <header className='header-hall'>
        <figure>
          <Image src={logo} alt='logo' class='logo-hall' />
        </figure>
        <h1 className='h1-hall'>BURGER QUEEN</h1>
        <figure>
          <Image src={line} alt='line' class='line-hall' />
        </figure>
      </header>
      <section>
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
      </section>
      
      <section className='section-menu'>
        <div className='menu-itens'>
         
          <Button
            name='CAFÉ DA MANHÃ'
            class='button-hall'
            type='text'
            value={breakfast}
            onChange={(e) => setMenu(e.target.value)}
          />
          <Button
            name='ALMOÇO / JANTAR'
            class='button-hall'
            type='text'
            value={brunch}
            onChange={(e) => setMenu(e.target.value)}
          />
          {/* <Menu type={menu} items={menu === 'breakfast' ? breakfast : brunch} /> */}

        </div>
        <div className='order-resume'> 
          <Button
          name='RESUMO'
          class='button-hall'
          type='text'
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
          <Button class='button-hall' name='CANCELAR' />
          <Button class='button-hall' name='ENVIAR' />
          <Button class='button-hall' name='EXIT' onClick={() => firebase.auth().signOut()} />
          {/* </Link> */}
        </div>
      </section>
    </div>
  );
};

export default Hall;
