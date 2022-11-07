import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import handleFetch from '../../services/api';
import CustomerOrderTable from './components/customerOrderTable';
import './index.css';

function CustomerOrderDetails() {
  const [order, setOrder] = useState();
  // const [products, setProducts] = useState([]);
  // const [totalPrice, setTotalPrice] = useState('');

  // const newSaleDetail = (sale) => {
  //   setSell(sale);
  //   setProducts(sale.products);
  // };

  // const getTotal = (prod) => {
  //   const prices = [];
  //   prod.map((product) => {
  //     const formatValue = product.subTotal.replace(',', '.');
  //     prices.push(formatValue);
  //     return formatValue;
  //   });
  //   const total = prices.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  //   setTotalPrice(total);
  // };
  const { id } = useParams();

  useEffect(() => {
    const getSaleById = async () => {
      const response = await handleFetch('GET', `/sales/${id}`);
      setOrder(response);
    };
    getSaleById();
  }, []);

  console.log(order);

  return (
    <section>
      {
        (!order)
          ? <div>Loading</div>
          : <CustomerOrderTable order={ order } />
      }
    </section>
  );
}

export default CustomerOrderDetails;
