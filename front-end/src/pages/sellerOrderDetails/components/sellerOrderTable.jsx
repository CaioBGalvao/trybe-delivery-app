import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { handlePut } from '../../../services/api';

function SellerOrderTable({ order }) {
  const [orderDate, setOrderDate] = useState();
  const [preparando, setPreparando] = useState(false);
  const [transito, setTransito] = useState(true);
  console.log(orderDate);

  useEffect(() => {
    const dateFormater = () => {
      const newDate = moment(order.saleDate).format('DD/MM/YYYY');
      setOrderDate(newDate);
    };
    dateFormater();
  }, []);

  useEffect(() => {
    if (order.status === 'Preparando') {
      setTransito(false);
    }
    if (order.status === 'Preparando'
    || order.status === 'Em Trânsito'
    || order.status === 'Entregue') {
      setPreparando(true);
    }
  }, []);

  const updatePreparando = async () => {
    const data = {
      status: 'Preparando',
    };

    try {
      await handlePut('PUT', `/sales/${order.id}`, data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateTransito = async () => {
    const data = {
      status: 'Em Trânsito',
    };

    try {
      await handlePut('PUT', `/sales/${order.id}`, data);
      setTransito(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const dataTest = 'seller_order_details__element-order';
  return (
    <section>
      <div>
        <h3 data-testid={ `${dataTest}-details-label-order-id` }>
          Pedido
          { order.id }
        </h3>
        <h4 data-testid={ `${dataTest}-details-label-order-date` }>
          { orderDate }
        </h4>
        <h4
          data-testid={ `${dataTest}-details-label-delivery-status` }
        >
          { order.status }
        </h4>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ updatePreparando }
          disabled={ preparando }
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ updateTransito }
          disabled={ transito }
        >
          Saiu Para Entrega
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            order.products.map(({
              name,
              price,
              saleProduct,
            }, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${dataTest}-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `${dataTest}-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `${dataTest}-table-quantity-${index}` }
                >
                  { saleProduct.quantity }
                </td>
                <td
                  data-testid={ `${dataTest}-table-unit-price-${index}` }
                >
                  { String(price).replace('.', ',') }
                </td>
                <td
                  data-testid={ `${dataTest}-table-sub-total-${index}` }
                >
                  { String((saleProduct.quantity * price).toFixed(2)).replace('.', ',') }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        Total:
        { String((order.totalPrice)).replace('.', ',') }
      </div>

    </section>
  );
}

SellerOrderTable.propTypes = {
  order: PropTypes.instanceOf(Object).isRequired,
};

export default SellerOrderTable;
