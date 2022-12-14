import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import handleFetch from '../../../services/api';

function SellerOrderTable({ order }) {
  const typeStatus = {
    preparing: {
      name: 'Preparando',
      disabledValues: ['Preparando', 'Entregue'],
    },
    dispatch: {
      name: 'Em Trânsito',
      disabledValues: ['Em Trânsito', 'Pendente', 'Entregue'],
    },
  };

  const [orderDate, setOrderDate] = useState();
  const [disabled, setDisabled] = useState({
    preparing: typeStatus.preparing
      .disabledValues.some((name) => name === order.status),
    dispatch: typeStatus.dispatch
      .disabledValues.some((name) => name === order.status),
  });
  const [statusLabel, setStatusLabel] = useState(order.status);

  useEffect(() => {
    const dateFormater = () => {
      const newDate = moment(order.saleDate).format('DD/MM/YYYY');
      setOrderDate(newDate);
    };
    dateFormater();
  }, [order.saleDate, order.status]);

  const dataTest = 'seller_order_details__element-order';

  const statusCheck = async (type) => {
    const response = await handleFetch(
      'PATCH',
      `/sales/${order.id}`,
      { status: typeStatus[type].name },
    );

    setStatusLabel(response);

    setDisabled({
      preparing: type === 'preparing',
      dispatch: type === 'dispatch',
    });
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
          { statusLabel }
        </h4>
        <button
          type="button"
          name="preparing"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ ({ target }) => statusCheck(target.name) }
          disabled={ disabled.preparing }
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          name="dispatch"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ ({ target }) => statusCheck(target.name) }
          disabled={ disabled.dispatch }
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
