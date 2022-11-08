import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { getFromLocalStorage, setIntoLocalStorage } from '../../utils/localStorage';
import handleFetch from '../../services/api';

export default function Checkout() {
  const dataTest = 'customer_checkout__element-order-table-';

  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [user, setUser] = useState([]);
  const [removeStatus, setRemoveStatus] = useState(0);

  const [selectSeller, setSelectSeller] = useState({ seller: '' });
  const [addres, setAddress] = useState('');
  const [number, setNumber] = useState('');

  // const [buttonStatus, setButtonStatus] = useState('false');
  const history = useNavigate();

  useEffect(() => {
    const getSellers = async () => {
      const response = await handleFetch('GET', '/sellers');
      setSellers(response);
    };
    getSellers();

    const userStorage = getFromLocalStorage('user');
    setUser(userStorage);
  }, []);

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

  const handleSelect = ({ target: { value, name } }) => {
    setSelectSeller((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const thisCheckout = async () => {
    const formateProduct = products.map((product) => ({
      productId: String(product.id),
      quantity: String(product.qty),
    }));

    const formate = {
      userId: String(user.id),
      sellerId: selectSeller.seller,
      salesProducts: formateProduct,
      deliveryAddress: String(addres),
      deliveryNumber: String(number),
      totalPrice: String(totalPrice),
    };

    try {
      const response = await handleFetch('POST', '/checkout', formate);
      console.log(response);
      history(`/customer/orders/${Number(response.saleId)}`);
    } catch (e) {
      console.log(e.message);
    }
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
                  { String(product.price).replace('.', ',') }
                </td>
                <td data-testid={ `${dataTest}sub-total-${index}` }>
                  { formate }
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `${dataTest}remove-${index}` }
                    onClick={ () => removeProduct(product.id) }
                  >
                    Remover
                  </button>
                </td>
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
        <select
          name="seller"
          data-testid="customer_checkout__select-seller"
          onChange={ handleSelect }
          value={ selectSeller.id }
        >
          <option>Selecione</option>
          { sellers.map((seller) => (
            <option value={ seller.id } key={ seller.id }>{ seller.name }</option>
          )) }
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          id="address"
          data-testid="customer_checkout__input-address"
          placeholder="Rua norberto mayer, bairro Eldorado"
          onChange={ ({ target: { value } }) => setAddress(value) }
          value={ addres }
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="text"
          id="number"
          data-testid="customer_checkout__input-address-number"
          placeholder="1661"
          onChange={ ({ target: { value } }) => setNumber(value) }
          value={ number }
        />
      </label>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ thisCheckout }
      >
        Finalizar pedido
      </button>
      {/* { buttonStatus !== 'false'
        ? <Navigate to={ `/customer/orders/${buttonStatus}` } /> : '' } */}
    </>
  );
}
