import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function CustomerOrders() {
  const [sales, setSales] = useState([]);

  const saleMock = [
    {
      saleId: 1,
      sellerId: 1,
      userId: 1,
      userName: 'Comprador',
      sellerName: 'Vendedor',
      date: '09-09-2022',
      total: '31,50',
      address: 'Rua Doze, 2300',
      status: 'Pendente',
    },
    {
      saleId: 2,
      sellerId: 1,
      userId: 1,
      userName: 'Comprador',
      sellerName: 'Vendedor',
      date: '10-09-2022',
      total: '243,50',
      address: 'Rua Doze, 2300',
      status: 'Em Trânsito',
    },
  ];

  const setAllSales = (saleList) => {
    setSales(saleList);
  };

  useEffect(() => {
    setAllSales(saleMock);
  }, []);

  console.log(sales);

  return (
    <div className="sale-section">
      {
        sales.map(({
          saleId,
          status,
          total,
          date,
        }) => (
          <Link to={ `/customer/orders/${saleId}` } key={ saleId }>
            <div className="sale-card">
              <div
                data-testid={ `customer_orders__element-order-id-${saleId}` }
                className="sale-title"
              >
                <p>Pedido</p>
                <p>{ saleId }</p>
              </div>
              <div
                data-testid={ `customers_orders__element-delivery-status-${saleId}` }
                className="sale-status"
              >
                <h3>{ status }</h3>
              </div>
              <div>
                <div data-testid={ `customer_orders__element-order-date-${saleId}` }>
                  <h4>{ date }</h4>
                </div>
                <div data-testid={ `customer_orders__element-card-price-${saleId}` }>
                  <h4>{ total }</h4>
                </div>
              </div>
            </div>
          </Link>

        ))
      }
    </div>
  );
}

export default CustomerOrders;
