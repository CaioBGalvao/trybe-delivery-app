import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import handleFetch from '../../services/api';
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

  const dateFormat = (saleDate) => {
    const date = new Date(saleDate.split('T')[0]);
    const twoNum = -2;

    const day = `0${date.getUTCDate()}`.slice(twoNum);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const currencyFormat = (currency) => parseFloat(currency)
    .toLocaleString('pt-br', { minimumFractionDigits: 2 });

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
                    <h4>{ dateFormat(saleDate) }</h4>
                  </div>
                  <div data-testid={ `customer_orders__element-card-price-${id}` }>
                    <h4>
                      {
                        currencyFormat(totalPrice)
                      }
                    </h4>
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
