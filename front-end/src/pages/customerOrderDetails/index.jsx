import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import handleFetch from '../../services/api';
import CustomerOrderTable from './components/customerOrderTable';
import Header from '../../components/header';
import './index.css';

function CustomerOrderDetails() {
  const [order, setOrder] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getSaleById = async () => {
      const response = await handleFetch('GET', `/sales/${id}`);
      setOrder(response);
    };
    getSaleById();
  }, [id]);

  console.log(order);

  return (
    <section>
      <Header />
      {
        (!order)
          ? <div>Loading</div>
          : <CustomerOrderTable order={ order } />
      }
    </section>
  );
}

export default CustomerOrderDetails;
