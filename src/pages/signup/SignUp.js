import React, { useState } from "react";
import { withRouter, useHistory } from "react-router";
import firebase from "../../firebase-config";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import "./SignUp.css";

const validateRegister = {
  fadeAway: true,
  fadeAwayTimeout: 2000,
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workPlace, setWorkplace] = useState("");
  const history = useHistory();

  const handleSignUp = () => {
    if (!name) {
      growl.error({ text: "Preencha seu nome", ...validateRegister });
      return;
    } else if (!email) {
      growl.error({ text: "Preencha um e-mail válido!", ...validateRegister });
      return;
    } else if (!password) {
      growl.error({ text: "Insira uma senha!", ...validateRegister });
      return;
    } else if (!workPlace) {
      growl.error({
        text: "Escolha uma área de trabalho",
        ...validateRegister,
      });
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        if (workPlace === "kitchen") {
          history.push("/kitchen");
        } else {
          history.push("/hall");
        }
      })
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .set({
            name,
            email,
            uid: firebase.auth().currentUser.uid,
            workPlace,
          })
          .then(
            firebase.auth().currentUser.updateProfile({
              displayName: name,
            })
          );
      })
      .catch((error) =>
        growl.error({
          text: "Erro desconhecido, contate um administrador!",
          ...validateRegister,
        })
      );
  };
  const noRefresh = (event) => {
    event.preventDefault();
    handleSignUp(email, password);
  };

  return (
    <div className='div-register'>
      <h1 className='bq-title'>BURGER QUEEN</h1>
      <div className='div-credentials'>
        <Input
          name='name'
          class='credentials'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nome'
        />
        <Input
          name='email'
          class='credentials'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <Input
          name='password'
          class='credentials'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Senha'
        />
        <Input
          name='workPlace'
          class='options'
          type='radio'
          value='kitchen'
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <label htmlFor='cozinha' className='label-signup'>
          COZINHA
        </label>
        <Input
          name='workPlace'
          class='options'
          type='radio'
          value='hall'
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <label htmlFor='salão' className='label-signup'>
          SALÃO
        </label>
        <Button
          id='login'
          class='button-create'
          name='CRIAR CONTA'
          type='submit'
          onClick={noRefresh}
        />
      </div>
    </div>
  );
};

export default withRouter(SignUp);
