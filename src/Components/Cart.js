// src/Pages/Cart.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import './Carts.css';

const Cart = () => {
  const { productId } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);



  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {isLoading ? (
        <p>Loading product...</p>
      ) : (
        <>
          {product && (
            <div className="cart-item">
              <img src={`http://localhost:8000${product.image}`} alt={product.name} />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>Price: £{product.price}</p>
              </div>
            </div>
          )}
        
        </>
      )}
    </div>
  );
};

export default Cart;




