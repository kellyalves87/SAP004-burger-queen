import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";
import logo from "../../assets/logo.png";
import SignUp from "../../pages/signup/SignUp";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/button";
import app from "../../firebase-config";
import Image from "../../components/image/image";
import '../../firebase/Auth';
// import 'firebase/firebase-firestore';
import './Login.css';

const Login = ({ history }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <header>
        <figure>
          <Image src={logo} alt='logo' class='logo' />
        </figure>
      </header>
      <h1>Burger Queen</h1>
      <form onSubmit={handleLogin}>
        <label>
          <input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          <input name='password' type='password' placeholder='Senha' />
        </label>
        <Button id='login' class='button-loggin' name='Entrar' type='submit' />
        <p onClick={() => setIsModalVisible(true)}>
          Ainda não tem cadastro? Registre-se<strong> aqui!</strong>
        </p>
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
            <SignUp />
          </Modal>
        ) : null}
      </form>
    </div>
  );
};

export default withRouter(Login);
