import React, {useState} from "react";
import { withRouter } from "react-router";
import firebase from "../../firebase-config";
import { useHistory } from "react-router-dom";
import Image from '../../components/image/image';
import logo from '../../assets/logo.svg';
import line from '../../assets/line.svg';
import fries from '../../assets/fries.svg';
import hamburger from '../../assets/hamburger.svg'
import juice from '../../assets/juice.svg';
import milkshake from '../../assets/milkshake.svg';
import soda from '../../assets/soda.svg';
import SignUp from "../signup/SignUp";
import Modal from '../../components/modal/modal';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import './Login.css';
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory()
  function loginUser(){
    firebase.auth().signInWithEmailAndPassword(email, password) //autenticando usuária logado
    .then((uid) => {
      //buscando a coleção do usuário 
      firebase.firestore().collection('users').doc(uid.user.uid).get()
      //uid.user.uid buscando o usuário especifico que esta logando 
      .then((doc) => {
        //doc.data tem todas as informações do usuário, nome, email, workplace...
        if(doc.data().workPlace === "kitchen") {
          history.push('/kitchen')
        } else {
          history.push('/hall')
        }
      })
    })
    .catch((error) => alert(error))
  }
  const noRefresh = (event) => {
    event.preventDefault()
    loginUser(email, password)
  }

  return (
    <div className='div-login'>
      <figure>
        <Image src={logo} alt='logo' class='logo' />        
      </figure>
      <h1 className='h1'>BURGER QUEEN</h1>
      <figure>
      <Image src={line} alt='line' class='line' />
      </figure>
      <form>
        <label>      
          <Input name="email" type="email" placeholder="Email" class="input-login" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <Input name="password" type="password" placeholder="Senha" class="input-login"value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <Button id="login" class="button-login" name="ENTRAR" type="submit"onClick = { noRefresh} />
        <p onClick={ () => setIsModalVisible(true) }>Ainda não tem cadastro? Registre-se<strong> aqui!</strong></p>
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
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
