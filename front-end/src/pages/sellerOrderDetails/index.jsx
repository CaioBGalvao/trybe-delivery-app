import React, { useEffect } from 'react';
import handleFetch from '../../services/api';

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
    <div>
      oi
    </div>
  );
}

export default SellerOrderDetails;
