import React from 'react';
import Header from '../../components/header';

function Products({ userEmail }) {
  return (
    <>
      <Header email={ userEmail } />
      <ProductsCards />
    </>
  );
}

Products.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default Products;
