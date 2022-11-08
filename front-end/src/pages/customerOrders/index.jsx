import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import handleFetch from '../../services/api';
import Header from '../../components/header';
import './index.css';

function CustomerOrders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSalesById = async () => {
      const response = await handleFetch('GET', '/sales');
      setSales(response);
    };
    getSalesById();
  }, []);

  console.log(sales);
  return (
    <section>
      <Header />

      <div className="sale-section">
        {
          sales.map(({
            id,
            status,
            totalPrice,
            saleDate,
          }) => (
            <Link to={ `/customer/orders/${id}` } key={ id }>
              <div className="sale-card">
                <div
                  data-testid={ `customer_orders__element-order-id-${id}` }
                  className="sale-title"
                >
                  <p>Pedido</p>
                  <p>{ id }</p>
                </div>
                <div
                  data-testid={ `customer_orders__element-delivery-status-${id}` }
                  className="sale-status"
                >
                  <h3>{ status }</h3>
                </div>
                <div>
                  <div data-testid={ `customer_orders__element-order-date-${id}` }>
                    <h4>{ moment(saleDate).format('DD/MM/YYYY') }</h4>
                  </div>
                  <div data-testid={ `customer_orders__element-card-price-${id}` }>
                    <h4>{ totalPrice.replace('.', ',') }</h4>
                  </div>
                </div>
              </div>
            </Link>

          ))
        }
      </div>
    </section>
  );
}

export default CustomerOrders;
