import React, { useEffect, useState } from 'react';

function NewUserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedRegister, setFailedRegister] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();

    const registerObj = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await handleFetch('POST', '/users', registerObj);
      if (response.message === message) {
        setFailedRegister(true);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const passMin = 6;
    const nameMin = 12;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      emailValidation.test(email)
      && password.length >= passMin
      && name.length > nameMin) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [name, email, password]);

  return (
    <form>
      <label htmlFor="name-input">
        Nome
        <input
          type="text"
          id="name-input"
          name="name-input"
          data-testid="admin_manage__input-name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email-input">
        Email
        <input
          type="email"
          id="email-input"
          name="email-input"
          data-testid="admin_manage__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha
        <input
          type="password"
          id="password-input"
          name="password-input"
          data-testid="admin_manage__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <label htmlFor="role-input">
        Tipo
        <select
          id="role-input"
          name="role-input"
          data-testid="admin_manage__select-role"
          value={ role }
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ isDisabled }
        onClick={ () => handleClick() }
      >
        Register
      </button>
      {failedRegister && (
        <p
          data-testid="admin_manage__element-invalid-register"
        >
          Falha no registro
        </p>
      )}
    </form>
  );
}
export default NewUserRegister;
