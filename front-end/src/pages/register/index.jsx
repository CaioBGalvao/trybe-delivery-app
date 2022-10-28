import React, { useState } from 'react';

function Register() {
  // Configuracao inicial do state register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameValidate, setNameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [failedRegister, setFailedRegister] = useState(false);

  // Validacao dos campos Nome, Email e Senha
  const nameValidation = (nameInfo) => {
    const minLength = 12;
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
    const minLength = 6;
    setPassword(passInfo);
    if (password.length > minLength) {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
  };

  const handleSubmit = () => {
    setFailedRegister(true);
  };

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
          onClick={ handleSubmit }
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
      </form>
    </section>
  );
}

export default Register;
