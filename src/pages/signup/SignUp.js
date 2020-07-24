import React, { useCallback } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase-config";
import Button from '../../components/button/button';
import Input from '../../components/input/Input'





const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
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
        <Input name='kitchen' type='radio' value='kitchen' />
        <label htmlFor='cozinha'>Cozinha</label>
        <Input name='hall' type='radio' value='hall' />
        <label htmlFor='salão'>Salão</label>
        <Button type='submit' name='CRIAR CONTA'/>
        <p>Já tem uma conta?<a href='login'> Acesse agora</a></p>
      </form>
    </div>
  );
};

export default withRouter(SignUp);