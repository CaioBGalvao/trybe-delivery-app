import React from 'react';

function Login() {
  return (
    <>
      <label htmlFor="emailLogin">
        Login
        <input id="emailLogin" type="email" data-testid="common_login__input-email" />
      </label>
      <label htmlFor="passwordLogin">
        Senha
        <input
          id="passwordLogin"
          type="password"
          data-testid="common_login__input-password"
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda não tenho conta
      </button>
    </>
  );
}

export default Login;
