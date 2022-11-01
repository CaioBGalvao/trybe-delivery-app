import React from 'react';
import { Navigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/localStorage';

function Header() {
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
            { getFromLocalStorage(user.name) }
          </h1>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ <Navigate to="/" /> }
          >
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
