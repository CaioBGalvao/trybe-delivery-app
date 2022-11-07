import React from 'react';
import PropTypes from 'prop-types';

function CustomerOrderTable({ order }) {
  const dataTest = 'customer_order_details__element-order';
  return (
    <section>
      <div>
        <h3 data-testid={ `${dataTest}-details-label-order-id` }>
          Pedido
          { order.id }
        </h3>
        <h4 data-testid={ `${dataTest}-details-label-seller-name` }>
          P.Vend:
          { order.seller.name }
        </h4>
        <h4 data-testid={ `${dataTest}-details-label-order-date` }>
          { order.saleDate }
        </h4>
        <h4
          data-testid={ `${dataTest}-details-label-delivery-status${order.saleId}` }
        >
          { order.status }
        </h4>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          Marcar Como Entregue
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
                  { String(price.toFixed(2)).replace('.', ',') }
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
        data-testid="customer_order_details__element-order-total-price"
      >
        Total:
        { String((order.totalPrice)).replace('.', ',') }
      </div>

    </section>
  );
}

CustomerOrderTable.propTypes = {
  order: PropTypes.instanceOf(Object).isRequired,
};

export default CustomerOrderTable;
