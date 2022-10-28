import React, { useState, useEffect } from 'react';

function Login() {
  // Estados a serem utilizados

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  // Validação de email e senha

  const validateInputs = (value, input) => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    const minLength = 6;

    if (input === 'email' && regex.test(value)) {
      setValidateEmail(true);
    } else if (input === 'email') {
      setValidateEmail(false);
    }

    if (input === 'password' && value.length >= minLength) {
      setValidatePassword(true);
    } else if (input === 'password') {
      setValidatePassword(false);
    }
  };

  useEffect(() => {
    // Vai ser utilizado para se comunicar com a api
  }, [validateEmail, validatePassword, email, password]);

  return (
    <>
      <label htmlFor="emailLogin">
        Login
        <input
          id="emailLogin"
          type="email"
          data-testid="common_login__input-email"
          onChange={ ({ target: { value } }) => {
            setEmail(value);
            validateInputs(value, 'email');
          } }
          value={ email }
        />
      </label>
      <label htmlFor="passwordLogin">
        Senha
        <input
          id="passwordLogin"
          type="password"
          data-testid="common_login__input-password"
          onChange={ ({ target: { value } }) => {
            setPassword(value);
            validateInputs(value, 'password');
          } }
          value={ password }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ !(validateEmail === true && validatePassword === true) }
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
