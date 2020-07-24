import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../firebase-config";
import Input from "../../components/input/input";
import Button from "../../components/button/button";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {

      console.log('entrou')

      event.preventDefault();
      const { email, password, name, kitchen, hall } = event.target.elements;

      const job = kitchen ? kitchen : hall;
      const userCollection = app.firestore().collection("users");

      app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {

          console.log('criou user', cred);

          cred.user.updateProfile({ displayName: name }).then(() => {
            const uid = app.auth().currentUser.uid;
            userCollection.doc(uid).set({ name, email, job });
          });
          history.push("/");
        })
        .catch((error) => alert(error));
    },
    [history]
  );

  return (
    <div>
      <h1>Burger Queen</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Nome
          <Input name='name' type='text' placeholder='Nome' />
        </label>
        <label>
          Email
          <Input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          Senha
          <Input name='password' type='password' placeholder='Senha' />
        </label>
        <Input name='kitchen' class='options' type='radio' value='kitchen' />
        <label htmlFor='cozinha'>COZINHA</label>
        <Input name='hall' class='options' type='radio' value='hall' />
        <label htmlFor='salão'>SALÃO</label>
        <Button
          id='login'
          class='button-loggin'
          name='CRIAR CONTA'
          type='submit'
        />
      </form>
    </div>
  );
};

export default withRouter(SignUp);
