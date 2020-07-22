import React, {useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base";
import Image from '../components/image/image';
import { AuthContext } from "../firebase/Auth";
import logo from '../assets/logo.png';
import SignUp from "./SignUp";
import Modal from '../components/modal/modal';
import Button from '../components/button/Button';
// import './Login.css';

const Login = ({ history }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleLogin = useCallback(
    async event => {
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

  const { currentUser } = useContext(AuthContext);  

  return (
    <div>
      <header>
      <figure>
        <Image src={logo} alt='logo' class='logo'/>
        </figure>
      </header>
      <h1>Burger Queen</h1>
      <form onSubmit={handleLogin}>
        <label>      
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          <input name="password" type="password" placeholder="Senha" />
        </label>
        <Button id="login" class="button-loggin" name="Entrar" type="submit" />
        <p onClick={ () => setIsModalVisible(true) }>Ainda não tem cadastro? <strong>Registre-se aqui!</strong></p>
        {isModalVisible ? (
                <Modal onClose={ () => setIsModalVisible(false) }>
                    <SignUp />
                </Modal>
                ) : null}
      </form>
    </div>
  );
};

export default withRouter(Login);
