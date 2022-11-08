import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  getFromLocalStorage, clearLocalStorage } from '../utils/localStorage';

function HeaderSeller() {
  const [statusNavigate, setStatusNavigate] = useState(false);

  const findName = () => {
    const userName = getFromLocalStorage('user');
    return userName.name;
  };

  const logout = () => {
    clearLocalStorage();

    setStatusNavigate(true);
  };

  return (
    <div>
      <nav>
        <div>
          <a
            data-testid="customer_products__element-navbar-link-orders"
            href="/seller/orders"
          >
            Meus Pedidos
          </a>
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

export default HeaderSeller;
