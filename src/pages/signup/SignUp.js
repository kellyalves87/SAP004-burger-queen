import React, { useState } from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import app from "../../firebase-config";
import "firebase";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workPlace, setWorkplace] = useState("");
  const history = useHistory();

  const createUser = (event) => {
    event.preventDefault();
    console.log(email, password);
    handleSignUp(email, password);
  };

  const handleSignUp = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        cred.user.updateProfile({ displayName: name }).then(() => {
          const uid = app.auth().currentUser.uid;
          const userCollection = app.firestore().collection("users");
          userCollection.doc(uid).set({ name, email, workPlace });
        });
        history.push("/");
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <h1>Burger Queen</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Nome
          <Input
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nome'
          />
        </label>
        <label>
          Email
          <Input
            name='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </label>
        <label>
          Senha
          <Input
            name='password'
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
        <label htmlFor='cozinha'>COZINHA</label>
        <Input
          name='workPlace'
          class='options'
          type='radio'
          value='hall'
          onChange={(e) => setWorkplace(e.target.value)}
        />
        <label htmlFor='salão'>SALÃO</label>
        <Button
          id='login'
          class='button-loggin'
          name='CRIAR CONTA'
          onClick={createUser}
          type='submit'
        />
      </form>
    </div>
  );
};

export default withRouter(SignUp);
