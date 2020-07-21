import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase/base";
import { AuthContext } from "../firebase/Auth";

const Login = ({ history }) => {
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

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Burger Queen</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Senha
          <input name="password" type="password" placeholder="Senha" />
        </label>
        <button type="submit">Entrar</button>
        <p>Ainda não se registrou? Cadastre-se<a href='#newAccount'>AQUI</a></p>
      </form>
    </div>
  );
};

export default withRouter(Login);
