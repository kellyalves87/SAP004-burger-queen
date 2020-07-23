import React, {useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase-config";
import Image from '../../components/image/image';
import { AuthContext } from "../../firebase/Auth";
import logo from '../assets/logo.png';
import fries from '../assets/fries.png';
import juice from '../assets/juice.png';
import milkshake from '../assets/milkshake.png';
import soda from '../assets/soda.png';
import SignUp from "./SignUp";
import Modal from '../../components/modal/modal';
import Button from '../../components/button/button';
import Input from '../../components/input/Input'
import './Login.css';
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
    <div className='div-login' >
      <figure>
        <Image src={logo} alt='logo' class='logo' />
        </figure>
      <h1>Burger Queen</h1>
      <form onSubmit={handleLogin}>
        <label>      
          <Input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          <Input name="password" type="password" placeholder="Senha" />
        </label>
        <Button id="login" class="button-loggin" name="Entrar" type="submit" />
        <p onClick={ () => setIsModalVisible(true) }>Ainda não tem cadastro?<br /> <strong>Registre-se aqui!</strong></p>
        {isModalVisible ? (
          <Modal onClose={ () => setIsModalVisible(false) }>
          <SignUp />
          </Modal>
          ) : null}
      </form>
      <section className="section">
        <Image src={fries} alt='logo' class='logo' class='img-section' />
        <Image src={juice} alt='logo' class='logo' class='img-section' />
        <Image src={milkshake} alt='logo' class='logo' class='img-section' />
        <Image src={soda} alt='logo' class='logo' class='img-section' />
        </section>
    </div>
  );
};
export default withRouter(Login);