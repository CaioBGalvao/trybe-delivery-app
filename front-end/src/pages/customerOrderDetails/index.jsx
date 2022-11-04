import React, { useState, useEffect } from 'react';
import './index.css';

function CustomerOrderDetails() {
  const [sell, setSell] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');

  const saleDetailMock = {
    saleId: 1,
    seller: 'Vendedor',
    date: '09-09-2022',
    status: 'Entregue',
    products: [
      {
        name: 'Produto 1',
        quantidade: 3,
        valorUnit: '32,40',
        subTotal: '97,20',
      },
      {
        name: 'Produto 2',
        quantidade: 5,
        valorUnit: '32,40',
        subTotal: '120,20',
      },
      {
        name: 'Produto 3',
        quantidade: 1,
        valorUnit: '32,40',
        subTotal: '32,40',
      },
    ],
  };

  const newSaleDetail = (sale) => {
    setSell(sale);
    setProducts(sale.products);
  };

  const getTotal = (prod) => {
    const prices = [];
    prod.map((product) => {
      const formatValue = product.subTotal.replace(',', '.');
      prices.push(formatValue);
      return formatValue;
    });
    const total = prices.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    newSaleDetail(saleDetailMock);
    getTotal(products);
  }, [products]);

  const dataTestId = 'customer_order_details__element-order';

  return (
    <section>
      <div className="order-table">
        <h3 data-testid={ `${dataTestId}-details-label-order-id` }>
          Pedido
          { sell.saleId }
        </h3>
        <h4 data-testid={ `${dataTestId}-details-label-seller-name` }>
          P.Vend:
          { sell.seller }
        </h4>
        <h4 data-dataTestId={ `${dataTestId}-details-label-order-date` }>
          { sell.date }
        </h4>
        <h4
          data-testid={ `${dataTestId}-details-label-delivery-status${sell.saleId}` }
        >
          { sell.status }
        </h4>
        <button
          type="button"
          data-testid="customer-order-details__button-delivery-check"
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
            products.map(({
              name,
              quantidade,
              valorUnit,
              subTotal,
            }, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${dataTestId}-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `${dataTestId}-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `${dataTestId}-table-quantity-${index}` }
                >
                  { quantidade }
                </td>
                <td
                  data-testid={ `${dataTestId}-table-unit-price-${index}` }
                >
                  { valorUnit }
                </td>
                <td
                  data-testid={ `${dataTestId}-table-sub-total-${index}` }
                >
                  { subTotal }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h3>
        Total:
        { totalPrice }
      </h3>
    </section>
  );
}

export default CustomerOrderDetails;
