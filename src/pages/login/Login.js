import React, { useState, useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../firebase-config";
import SignUp from "../../pages/signup/SignUp";
import Image from "../../components/image/image";
import logo from "../../assets/logo.png";
import fries from "../../assets/fries.png";
import juice from "../../assets/juice.png";
import milkshake from "../../assets/milkshake.png";
import soda from "../../assets/soda.png";
import Modal from "../../components/modal/modal";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import "./Login.css";


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
    <div className='div-login'>
      <figure>
        <Image src={logo} alt='logo' class='logo' />
      </figure>
      <h1>Burger Queen</h1>
      <form onSubmit={handleLogin}>
        <label>
          <Input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          <Input name='password' type='password' placeholder='Senha' />
        </label>
        <Button id='login' class='button-loggin' name='ENTRAR' type='submit' />
        <p onClick={() => setIsModalVisible(true)}>
          Ainda não tem cadastro? Registre-se<strong> aqui!</strong>
        </p>
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
            <SignUp />
          </Modal>
        ) : null}
      </form>
      <section className='section'>
        <Image src={fries} alt='logo' class='logo' className='img-section' />
        <Image src={juice} alt='logo' class='logo' className='img-section' />
        <Image src={milkshake} alt='logo' class='logo' className='img-section' />
        <Image src={soda} alt='logo' class='logo' className='img-section' />
      </section>
    </div>
  );
};

export default withRouter(Login);
