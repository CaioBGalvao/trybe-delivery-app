import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { getFromLocalStorage, setIntoLocalStorage } from '../../utils/localStorage';

export default function Checkout() {
  const dataTest = 'customer_checkout__element-order-table-';

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [removeStatus, setRemoveStatus] = useState(0);

  useEffect(() => {
    const responseStorage = getFromLocalStorage('carrinho');
    setProducts(responseStorage);

    const totalStorage = getFromLocalStorage('totalPrice');
    setTotalPrice(totalStorage);
  }, [removeStatus]);

  const removeProduct = (product) => {
    const remove = products.filter((p) => p.id !== product);
    setIntoLocalStorage('carrinho', remove);

    let total = 0;

    remove.forEach((p) => {
      total += (Number(p.price) * p.qty);
    });
    setIntoLocalStorage('totalPrice', total.toFixed(2));

    setRemoveStatus(removeStatus + 1);
  };

  return (
    <>
      <Header />
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { products ? products.map((product, index) => {
            const formateNum = String((product.qty * Number(product.price)).toFixed(2));
            const formate = formateNum.replace('.', ',');
            return (
              <tr key={ index }>
                <td data-testid={ `${dataTest}item-number-${index}` }>
                  { index + 1 }
                </td>
                <td data-testid={ `${dataTest}name-${index}` }>{ product.name }</td>
                <td data-testid={ `${dataTest}quantity-${index}` }>{ product.qty }</td>
                <td data-testid={ `${dataTest}unit-price-${index}` }>
                  { (product.price).replace('.', ',') }
                </td>
                <td data-testid={ `${dataTest}sub-total-${index}` }>
                  { formate }
                </td>
                <button
                  type="button"
                  data-testid={ `${dataTest}remove-${index}` }
                  onClick={ () => removeProduct(product.id) }
                >
                  Remover
                </button>
              </tr>
            );
          }) : '' }
        </tbody>
      </table>
      <h2 data-testid="customer_checkout__element-order-total-price">
        { totalPrice.replace('.', ',') }
      </h2>
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select name="seller" data-testid="customer_checkout__select-seller">
          <option value="Rodrigo">Rodrigo</option>
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          id="address"
          data-testid="customer_checkout__input-address"
          placeholder="Rua norberto mayer, bairro Eldorado"
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="text"
          id="number"
          data-testid="customer_checkout__input-address-number"
          placeholder="1661"
        />
      </label>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar pedido
      </button>
    </>
  );
}
