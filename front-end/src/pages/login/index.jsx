import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import handleFetch from '../../services/api';
import { setIntoLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import './index.css';

function Login() {
  const history = useNavigate();
  // capturando a rota atual

  const location = useLocation();

  // Estados a serem utilizados

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [validateApi, setValidateApi] = useState('ok');
  const [roleStatus, setRoleStatus] = useState('');

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

  const setApi = async () => {
    const inputsFormate = {
      email,
      password,
    };

    try {
      const response = await handleFetch('POST', '/login', inputsFormate);
      const { name, role, token, id } = response;
      if (Object.keys(response)[0] === 'message') {
        setValidateApi(response.message);
      } else {
        setRoleStatus(role);
        setIntoLocalStorage('user', { name, email, role, token, id });
        setValidateApi('true');
      }
    } catch (e) {
      setValidateApi(e.message);
    }
  };

  const switchRoute = () => {
    if (roleStatus === 'seller') {
      return <Navigate to="/sellers/orders" />;
    }

    if (roleStatus === 'customer') {
      return <Navigate to="/customer/products" />;
    }

    if (roleStatus === 'administrator') {
      return <Navigate to="/admin/manage" />;
    }
  };

  useEffect(() => {
    const { role } = getFromLocalStorage('user');

    if (role === 'customer') {
      return history('/customer/products');
    }
    if (role === 'seller') {
      return history('/sellers/orders');
    }
    if (role === 'administrator') {
      return history('/admin/manage');
    }
  }, []);

  return (
    <>
      { location.pathname !== '/login' ? <Navigate to="/login" /> : '' }
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
        onClick={ setApi }
      >
        LOGIN
      </button>
      <a href="/register">
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </a>
      { validateApi === 'ok' && validateApi !== 'true' ? ('')
        : (<p data-testid="common_login__element-invalid-email">{ validateApi }</p>) }
      { validateApi === 'true' ? switchRoute() : ''}
    </>
  );
}

export default Login;
