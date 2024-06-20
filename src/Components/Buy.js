// src/Pages/Buy.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import './Buys.css';

const Buy = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = (product) => {
    addToCart(product);
    history.push('/cart');
  };

  return (
    <div className="product-container">
      {isLoading ? (
        <p>Loading product...</p>
      ) : (
        product ? (
          <div className="product-box">
            <div className="product-left">
              <img src={`http://localhost:8000${product.image}`} alt={product.name} />
            </div>
            <div className="product-right">
              <h2>{product.name}</h2>
              <p className="product-price">Price: £{product.price}</p>
              <div className="product-icons">
                <i className='bx bx-star'></i>
                <i className='bx bx-star'></i>
                <i className='bx bx-star'></i>
                <i className='bx bx-star'></i>
                <i className='bx bx-star'></i>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-buttons">
                <button className="buy-button">Buy</button>
                <button 
                  className="add-cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )
      )}
    </div>
  );
};

export default Buy;
