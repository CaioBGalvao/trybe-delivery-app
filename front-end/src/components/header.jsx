import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getFromLocalStorage, setIntoLocalStorage } from '../utils/localStorage';

function Header() {
  const [statusNavigate, setStatusNavigate] = useState(false);

  const findName = () => {
    const userName = getFromLocalStorage('user');
    return userName.name;
  };

  const logout = () => {
    setIntoLocalStorage('user', '');

    setStatusNavigate(true);
  };

  return (
    <div>
      <nav>
        <div>
          <h1
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </h1>
          <h1
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </h1>
          <h1
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { findName() }
          </h1>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ logout }
          >
            Sair
          </button>
          { statusNavigate ? <Navigate to="/" /> : '' }
        </div>
      </nav>
    </div>
  );
}

export default Header;
