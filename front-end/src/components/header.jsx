import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { clearLocalStorage, getFromLocalStorage } from '../utils/localStorage';

function Header() {
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
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </Link>
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            Meus Pedidos
          </Link>
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
