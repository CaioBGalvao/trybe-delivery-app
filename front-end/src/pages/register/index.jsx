import React from 'react';

function Register() {
  // Configuracao inicial do state register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validacao dos campos Nome, Email e Senha
  const nameValidation = (nameInfo) => {
    const button = document.querySelector('#button');
    const minLength = 12;
    setName(nameInfo);
    if (name.length < minLength) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  const emailValidation = (emailInfo) => {
    const button = document.querySelector('#button');
    setEmail(emailInfo);
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regex.test(email)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  const passwordValidation = (passInfo) => {
    const button = document.querySelector('#button');
    const minLength = 6;
    setPassword(passInfo);
    if (password.length < minLength) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  return (
    <section>
      <form>
        <h1>Cadastro</h1>
        <label htmlFor="name-input">
          <input
            className="name-input-register"
            placeHolder="Nome"
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
          type="submit"
          id="button-sumbit"
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}

export default Register;
