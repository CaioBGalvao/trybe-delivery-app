import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import handleFetch from '../../../services/api';
import { setIntoLocalStorage } from '../../../utils/localStorage';

function RenderProducts() {
  // Configuracao inicial do state

  const [producsArray, setProductsArray] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutStatus, setCheckoutStatus] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await handleFetch('GET', '/products');

      console.log(response, 'response');
      setProductsArray(response);

      const formateQuantity = response.map(() => 0);

      setQuantity(formateQuantity);
    };
    getProducts();
  }, []);

  const defineQuantity = (type, index, value) => {
    if (type === 'add') {
      const quantityResult = quantity.map((q, i) => {
        if (i === index) return q + 1;
        return q;
      });

      return setQuantity(quantityResult);
    }

    if (type === 'subtract') {
      const quantityResult = quantity.map((q, i) => {
        if (i === index && q !== 0) return q - 1;
        return q;
      });

      return setQuantity(quantityResult);
    }

    if (type === 'input') {
      const number = Number(value);
      const quantityResult = quantity.map((q, i) => {
        if (i === index) q = number;
        return q;
      });
      return setQuantity(quantityResult);
    }
  };

  useEffect(() => {
    if (quantity && producsArray) {
      const resultStorage = producsArray.map((product, index) => {
        if (quantity[index] > 0) {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: quantity[index],
          };
        }
        return 'vazio';
      });
      const removeStrings = resultStorage.filter((element) => element !== 'vazio');
      setIntoLocalStorage('carrinho', removeStrings);

      let total = 0;
      const formatePrices = producsArray.map((product, index) => (
        (Number(product.price) * quantity[index]).toFixed(2)
      ));
      formatePrices.forEach((price) => {
        total += Number(price);
      });
      setTotalPrice(total.toFixed(2));
      setIntoLocalStorage('totalPrice', total.toFixed(2));
    }
  }, [quantity, producsArray]);

  return (
    <div>
      {producsArray.map(
        (product, index) => (
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
              onClick={ () => { defineQuantity('subtract', index); } }
            >
              -
            </button>
            <input
              type="number"
              min="0"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              onChange={ ({ target }) => defineQuantity('input', index, target.value) }
              value={ quantity[index] }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              onClick={ () => { defineQuantity('add', index); } }
            >
              +
            </button>
          </div>
        ),
      )}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => setCheckoutStatus(true) }
        disabled={ totalPrice === '0.00' }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          { totalPrice !== 0 ? totalPrice.replace('.', ',') : 0 }
        </p>
      </button>
      { checkoutStatus === true ? <Navigate to="/customer/checkout" /> : '' }
    </div>
  );
}

export default RenderProducts;
