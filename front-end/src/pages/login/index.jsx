import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <label htmlFor="emailLogin">
        Login
        <input
          id="emailLogin"
          type="email"
          data-testid="common_login__input-email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          value={ email }
        />
      </label>
      <label htmlFor="passwordLogin">
        Senha
        <input
          id="passwordLogin"
          type="password"
          data-testid="common_login__input-password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          value={ password }
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
