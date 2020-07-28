import React, { useState } from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
// import growl from "growl-alert";
// import "growl-alert/dist/growl-alert.css";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Image from "../../components/image/image";
import logo from "../../assets/logo.svg";
import line from "../../assets/line.svg";

const Hall = () => {
  const [startService, setStartService] = useState("");
  const [numberTable, setNumberTable] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunchDinner, setLunchDinner] = useState("");
  const [resume, setResume] = useState("");

  return (
    <div>
      <Link to='/login'>
        <figure>
          <Image src={logo} alt='logo' class='logo' />
        </figure>
        <h1 className='h1'>BURGER QUEEN</h1>
        <figure>
          <Image src={line} alt='line' class='line' />
        </figure>
        <label className='label-service' />
        INICIAR ATENDIMENTO
        <Input
          name='start-service'
          class='service'
          type='text'
          value={startService}
          onChange={(e) => setStartService(e.target.value)}
          placeholder='Nome Cliente'
        />
        <label className='label-service' />
        NÚMERO MESA
        <Input
          name='number-table'
          class='service'
          type='text'
          value={numberTable}
          onChange={(e) => setNumberTable(e.target.value)}
          placeholder='N° Mesa'
        />
        <Input
          name='CAFÉ DA MANHÃ'
          class='breakfast'
          type='text'
          value={breakfast}
          onChange={(e) => setBreakfast(e.target.value)}
        />
        <Input
          name='ALMOÇO/JANTAR'
          class='lunch-dinner'
          type='text'
          value={lunchDinner}
          onChange={(e) => setLunchDinner(e.target.value)}
        />
        <Input
          name='RESUMO'
          class='resume'
          type='text'
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <Button name='CANCELAR' />
        <Button name='ENVIAR' />
        <Button name='EXIT' onClick={() => firebase.auth().signOut()} />
      </Link>
    </div>
  );
};

export default Hall;
