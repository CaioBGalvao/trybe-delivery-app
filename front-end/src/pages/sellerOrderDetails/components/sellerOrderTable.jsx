import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import handleFetch from '../../../services/api';

function SellerOrderTable({ order }) {
  const [orderDate, setOrderDate] = useState();
  console.log(orderDate);

  useEffect(() => {
    const dateFormater = () => {
      const newDate = moment(order.saleDate).format('DD/MM/YYYY');
      setOrderDate(newDate);
    };
    dateFormater();
  }, [order.saleDate]);

  const dataTest = 'seller_order_details__element-order';

  const statusCheck = async (type) => {
    const typePatch = { preparing: 'Preparando', dispatch: 'Em Trânsito' };

    await handleFetch(
      'PATCH',
      `/checkout/sales/status/${order.id}`,
      { status: typePatch[type] },
    );
  };

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
          name="preparing"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ ({ target }) => statusCheck(target.name) }
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          name="dispatch"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ ({ target }) => statusCheck(target.name) }
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
