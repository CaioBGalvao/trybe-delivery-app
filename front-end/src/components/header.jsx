import React from 'react';
import { Navigate } from 'react-router-dom';
import handleFetch from '../../src/services/api';

function Header({ userEmail }) {

  const userName  = async (email) => {
    try {
      const response = await handleFetch('GET', '/register', email);
      const user = response.find((res) => res.email === email);
      return user.name;
    } catch (e) {
      return(e.message);
    }

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
            { userName(userEmail) }
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

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default Header;
