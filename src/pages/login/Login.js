import React, { useState } from "react";
import firebase from "../../firebase-config";
import Image from "../../components/image/image";
import logo from "../../assets/logo.svg";
import line from "../../assets/line.svg";
import fries from "../../assets/fries.svg";
import hamburger from "../../assets/hamburger.svg";
import juice from "../../assets/juice.svg";
import milkshake from "../../assets/milkshake.svg";
import soda from "../../assets/soda.svg";
import SignUp from "../signup/SignUp";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import "./Login.css";

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginUser() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password) //autenticando usuária logado
      .then()
      .catch((error) => alert(error));
  }
  
  const noRefresh = (event) => {
    event.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className='div-login'>
      <figure className='figure-login'> 
        <Image src={logo} alt='logo' class='logo' />
      </figure>
      <h1 className='h1'>BURGER QUEEN</h1>
      <figure>
        <Image src={line} alt='line' class='line' />
      </figure>
      <form>
        <label>
          <Input
            name='email'
            type='email'
            placeholder='Email'
            class='input-login'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <Input
            name='password'
            type='password'
            placeholder='Senha'
            class='input-login'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button
          id='login'
          class='button-login'
          name='ENTRAR'
          type='submit'
          onClick={noRefresh}
        />
        <p className='p-login' onClick={() => setIsModalVisible(true)}>
          Ainda não tem cadastro? Registre-se<strong> AQUI!</strong>
        </p>
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
            <SignUp />
          </Modal>
        ) : null}
      </form>
      <footer className='footer-login'>
        <Image src={fries} alt='logo' class='img-section' />
        <Image src={juice} alt='logo' class='img-section' />
        <Image src={milkshake} alt='logo' class='img-section' />
        <Image src={soda} alt='logo' class='img-section' />
        <Image src={hamburger} alt='logo' class='img-section' />
      </footer>
    </div>
  );
};

export default Login;
