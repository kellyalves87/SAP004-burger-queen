import React, { useState } from "react";
import { withRouter, useHistory } from "react-router";
import firebase from "../../firebase-config";
import Input from "../../components/input/Input";
import Button from "../../components/button/button";
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [workPlace, setWorkplace] = useState('')
  const history = useHistory()

  // event.preventDefault();
      // const { email, password, name, workPlace } = event.target.elements;

      // const workPlace = kitchen ? kitchen : hall;
      // const userCollection = firebase.firestore().collection("users");

  const handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(()=> {
          if(workPlace ==="kitchen"){
            history.push('/kitchen')
          } else {
            history.push('/hall')
          }
        })
        //por padrão todas as funções retornam uma promessa
        .then(() => {
          // uid salvando : referenciano a coleção, salvando "indetificação !@#s22544xcvzxcfxdcf" da coleção 
          const uid = firebase.auth().currentUser.uid
          firebase.firestore().collection('users').doc(uid)
          //set inserindo as informações que preciso na coleção 
            .set({
            name,
            email,
            uid: firebase.auth().currentUser.uid,
            workPlace
          })
          // caso queira usar o nome do funcionario em alguem lugar 
          .then(
            firebase.auth().currentUser.updateProfile({
              displayName: name,
            })
          )        
        })
        .catch((error) => alert(error));
    }  
    const noRefresh = (event) => {
      event.preventDefault()
      handleSignUp(email, password)
    }

  return (
    <div>
      <h1>Burger Queen</h1>
      <div>
        <label>
          Nome
          <Input name='name' type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Nome' />
        </label>
        <label>
          Email
          <Input name='email' type='text'value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
        </label>
        <label>
          Senha
          <Input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Senha' />
        </label>
        <Input name='workPlace' class='options' type='radio' value='kitchen' onChange={e => setWorkplace(e.target.value)} />
        <label htmlFor='cozinha'>COZINHA</label>
        <Input name='workPlace' class='options' type='radio' value='hall' onChange={e => setWorkplace(e.target.value)} />
        <label htmlFor='salão'>SALÃO</label>
        <Button
          id='login'
          class='button-loggin'
          name='CRIAR CONTA'
          type='submit'
          onClick = {noRefresh}
        />
      </div>
    </div>
  );
};

export default withRouter(SignUp);