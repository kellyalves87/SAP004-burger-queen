import React, { useState } from "react";
import { withRouter, useHistory } from "react-router";
import firebase from "../../firebase-config";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workPlace, setWorkplace] = useState("");
  const history = useHistory();

  const handleSignUp = () => {
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
      //por padrão todas as funções retornam uma promessa
      .then(() => {
        // uid salvando : referenciano a coleção, salvando "indetificação !@#s22544xcvzxcfxdcf" da coleção
        const uid = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          //set inserindo as informações que preciso na coleção
          .set({
            name,
            email,
            uid: firebase.auth().currentUser.uid,
            workPlace,
          })
          // caso queira usar o nome do funcionario em alguem lugar
          .then(
            firebase.auth().currentUser.updateProfile({
              displayName: name,
            })
          );
      })
      .catch((error) => alert(error));
  };
  const noRefresh = (event) => {
    event.preventDefault();
    handleSignUp(email, password);
  };

  return (
    <div>
      <h1 className='bq-title'>BURGER QUEEN</h1>
      <div>
        <label className='label-signup'>
          Nome
          <Input
            name='name'
            class='credentials'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nome'
          />
        </label>
        <label className='label-signup'>
          Email
          <Input
            name='email'
            class='credentials'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </label>
        <label className='label-signup'>
          Senha
          <Input
            name='password'
            class='credentials'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Senha'
          />
        </label>
        <Input
          name='workPlace'
          class='options'
          type='radio'
          value='kitchen'
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <label htmlFor='cozinha' class='label-signup'>
          COZINHA
        </label>
        <Input
          name='workPlace'
          class='options'
          type='radio'
          value='hall'
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <label htmlFor='salão' class='label-signup'>
          SALÃO
        </label>
        <Button
          id='login'
          class='button-loggin'
          name='CRIAR CONTA'
          type='submit'
          onClick={noRefresh}
        />
      </div>
    </div>
  );
};

export default withRouter(SignUp);
