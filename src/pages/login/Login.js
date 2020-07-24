import React, {useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase-config";
import Image from '../../components/image/image';
import { AuthContext } from "../../firebase/Auth";
import logo from '../../assets/logo.png';
import line from '../../assets/line.png';
import fries from '../../assets/fries.png';
import hamburger from '../../assets/hamburger.png'
import juice from '../../assets/juice.png';
import milkshake from '../../assets/milkshake.png';
import soda from '../../assets/soda.png';
import SignUp from "../signup/SignUp";
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
      <h1 className='h1'>BURGER QUEEN</h1>
      <figure>
      <Image src={line} alt='line' class='line' />
      </figure>
      <form onSubmit={handleLogin}>
        <label>      
          <Input name="email" type="email" placeholder="Email" class="input-login"/>
        </label>
        <label>
          <Input name="password" type="password" placeholder="Senha" class="input-login" />
        </label>
        <Button id="login" class="button-login" name="Entrar" type="submit" />
        <p onClick={ () => setIsModalVisible(true) }>Ainda não tem cadastro?<br /> <strong>Registre-se aqui!</strong></p>
        {isModalVisible ? (
          <Modal onClose={ () => setIsModalVisible(false) }>
          <SignUp />
          </Modal>
          ) : null}
      </form>
      <section className="section">
        <Image src={fries} alt='logo'  class='img-section' />
        <Image src={juice} alt='logo' class='img-section' />
        <Image src={milkshake} alt='logo'  class='img-section' />
        <Image src={soda} alt='logo'  class='img-section' />
        <Image src={hamburger} alt='logo'  class='img-section' />
        </section>
    </div>
  );
};
export default withRouter(Login);