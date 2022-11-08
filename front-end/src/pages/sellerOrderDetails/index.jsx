import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import handleFetch from '../../services/api';
import SellerOrderTable from './components/sellerOrderTable';

function SellerOrderDetails() {
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
      {
        (!order)
          ? <div>Loading</div>
          : <SellerOrderTable order={ order } />
      }
    </section>
  );
}

export default SellerOrderDetails;
