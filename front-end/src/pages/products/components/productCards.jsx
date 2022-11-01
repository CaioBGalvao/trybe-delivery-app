import React, { useState, useEffect } from 'react';
import handleFetch from '../../../services/api';

function RenderProducts() {
  // Configuracao inicial do state

  const [producsArray, setProductsArray] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await handleFetch('GET', '/products');
      setProductsArray(response);
    };
    getProducts();
  });

  return (
    <div>
      {producsArray.map(
        (product) => (
          <div
            data-testid={ `customer_products__element-card-price-${product.id}` }
            key={ product.id }
          >
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
              width="50em"
            />
            <p data-testid={ `customer_products__element-card-title-${product.id}` }>
              {' '}
              { product.name }
            </p>
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              { product.price.replace('.', ',') }
            </p>
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            >
              -
            </button>
            <input
              type="number"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              defaultValue={ 0 }
              min={ 0 }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
            >
              +
            </button>
          </div>
        ),
      )}
    </div>
  );
}

export default RenderProducts;
