import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import handleFetch from '../../services/api';

function Register() {
  // Configuracao inicial do state register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validacoes
  const [nameValidate, setNameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);

  // Requisicao de registro
  const [failedRegister, setFailedRegister] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  // Validacao dos campos Nome, Email e Senha
  const nameValidation = (nameInfo) => {
    const minLength = 10;
    setName(nameInfo);
    if (name.length > minLength) {
      setNameValidate(true);
    } else {
      setNameValidate(false);
    }
  };

  const emailValidation = (emailInfo) => {
    setEmail(emailInfo);
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regex.test(email)) {
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }
  };

  const passwordValidation = (passInfo) => {
    setPassword(passInfo);
    const minLength = 4;
    if (password.length <= minLength) {
      setPasswordValidate(false);
    } else {
      setPasswordValidate(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registerObj = {
      name,
      email,
      password,
    };

    try {
      const response = await handleFetch('POST', '/login/cadastro', registerObj);
      const message = 'Email already registered';
      if (response.message === message) {
        setFailedRegister(true);
        setSuccessRegister(false);
      } else {
        setSuccessRegister(true);
      }

      console.log(response);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    setFailedRegister(false);
  }, [name, email, password]);

  return (
    <section>
      <form>
        <h1>Cadastro</h1>
        <label htmlFor="name-input">
          <input
            className="name-input-register"
            placeholder="Nome"
            data-testid="common_register__input-name"
            onChange={ ({ target: { value } }) => nameValidation(value) }
          />

        </label>
        <label htmlFor="email-input">
          <input
            className="email-input-register"
            placeholder="Email"
            data-testid="common_register__input-email"
            onChange={ ({ target: { value } }) => emailValidation(value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            className="password-input-register"
            placeholder="Senha"
            data-testid="common_register__input-password"
            onChange={ ({ target: { value } }) => passwordValidation(value) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          onClick={ (event) => handleSubmit(event) }
          id="button-submit"
          disabled={ !(nameValidate === true
            && emailValidate === true && passwordValidate === true) }
        >
          Cadastrar
        </button>
        {
          (failedRegister)
            ? (
              <p data-testid="common_register__element-invalid_register">
                Usuário ja cadastrado
              </p>
            )
            : null
        }
        {
          (successRegister)
            ? <Navigate to="/customer/products" />
            : null
        }
      </form>
    </section>
  );
}

export default Register;
