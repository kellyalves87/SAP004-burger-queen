import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";

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
      <form onSubmit={handleSignUp}>
        <label>
          Nome
          <input name='name' type='text' placeholder='Nome' />
        </label>
        <label>
          Email
          <input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          Senha
          <input name='password' type='password' placeholder='Senha' />
        </label>
        <input name='kitchen' type='radio' value='kitchen' />
        <label for='Cozinha'>Cozinha</label>
        <input name='hall' type='radio' value='hall' />
        <label for='Salão'>Salão</label>
        <button type='reset'>CANCELAR</button>
        <button type='submit'>CRIAR CONTA</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
