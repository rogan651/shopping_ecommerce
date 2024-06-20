import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Myorderss.css'; 

const Myorder = () => {

  const [boughtProducts, setBoughtProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchBoughtProducts = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT'); // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
      setBoughtProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBoughtProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="myorder-container">
      <h1 className="myorder-header">My Orders</h1>
      <ul className="myorder-list">
        {boughtProducts.map((product, index) => (
          <li key={index} className="myorder-item">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Myorder;
