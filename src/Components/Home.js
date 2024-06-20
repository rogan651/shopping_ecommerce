import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import './Homes.css';

const Home = () => {
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const { addToCart } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/upload-image/');
        setBannerImageUrl(`http://127.0.0.1:8000${response.data.image}`);
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        const sortedProducts = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setProducts(sortedProducts);
        setQuantities(sortedProducts.reduce((acc, product) => {
          acc[product.id] = 0;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerImage();
    fetchProducts();
  }, []);

  const handleBuyNow = async (product) => {
    try {
      const productData = {
        product_id: product.id,  // Send product_id instead of product details
        quantity: quantities[product.id],
      };
  
      const response = await axios.post('http://127.0.0.1:8000/api/buy/', productData);
      setPurchaseSuccess(true); // Set purchase success state
      history.push(`/Buy/${product.id}`);
    } catch (error) {
      console.error('Error buying product:', error.response.data); // Log detailed error response
      setPurchaseSuccess(false); // Set purchase failed state
    }
  };
  
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIncrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] > 0 ? prevQuantities[productId] - 1 : 0,
    }));
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: quantities[product.id] });
    history.push('/cart');
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="icon-boxes">
          <div className="icon-box">
            <i className='bx bxl-instagram-alt'></i>
          </div>
          <div className="icon-box">
            <i className='bx bxl-facebook-circle'></i>
          </div>
          <div className="icon-box">
            <i className='bx bxl-twitter'></i>
          </div>
          <div className="icon-box">
            <i className='bx bxs-store'></i>
          </div>
        </div>

        <div className="search-boxx">
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} />
          <button type="submit"><i className='bx bx-search-alt-2 icon'></i></button>
        </div>

        <div className="help-line">
          <i className='bx bxs-phone-call'></i>
          <p style={{ marginLeft: '10px', margin: '0' }}>Help-line center :</p>
          <span style={{ marginLeft: '10px' }}>022-23456</span>
        </div>
      </div>

      <div className="banner" style={{ backgroundImage: `url(${bannerImageUrl})` }}>
        <div className="banner-content">
          <h1>Men's Collection</h1>
          <p>From t-shirts, jeans, jackets, shirts, watches, bags, sunglasses</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-box">
          <i className='bx bxs-truck'></i>
          <h3>Free Delivery</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div className="feature-box">
          <i className='bx bx-gift'></i>
          <h3>Member Discount</h3>
          <p>Free deals every week</p>
        </div>
        <div className="feature-box">
          <i className='bx bx-refresh'></i>
          <h3>Money Back</h3>
          <p>Refund in 30 days</p>
        </div>
        <div className="feature-box">
          <i className='bx bx-lock'></i>
          <h3>Secure Payment</h3>
          <p>No transaction fees</p>
        </div>
        <div className="feature-box">
          <i className='bx bx-undo'></i>
          <h3>Free Return</h3>
          <p>Refund in 365 days</p>
        </div>
      </div>

      <div className="item-show">
        <a href="#" className="item">
          <span className="title">aaaaa</span>
          <span className="link" href="#">aaaaa</span>
          <img className="img" src="" alt="" />
        </a>
        <a href="#" className="item">
          <span className="title">ddddd</span>
          <span className="link" href="#">dddd</span>
          <img className="img" src="" alt="" />
        </a>
        <a href="#" className="item">
          <span className="title">eeee</span>
          <span className="link" href="#">ffff</span>
          <img className="img" src="" alt="" />
        </a>
        <a href="#" className="item">
          <span className="title">eeee</span>
          <span className="link" href="#">eee</span>
          <img className="img" src="" alt="" />
        </a>
        <a href="#" className="item">
          <span className="title">bbbb</span>
          <span className="link" href="#">vvvv</span>
          <img className="img" src="https://media.nihalfashions.com/media/catalog/product/cache/441933f201159ac6aa81e856d506a0a3/r/a/rama-blue-jaquard-boys-indo-western-nkk-798.jpg" alt="" />
        </a>
        <a href="#" className="item">
          <span className="title">ffff</span>
          <span className="link" href="#">rrrr</span>
          <img className="img" src="" alt="" />
        </a>
      </div>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={`http://localhost:8000${product.image}`} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <div className="product-info">
                  <p className="product-price"><i className='bx bxs-purchase-tag'></i> {product.price}</p>
                </div>
                
                <div className="product-actions">
                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                    <i className='bx bx-cart-add'></i>
                  </button>
                  <div className="quantity-control">
                    <button onClick={() => handleDecrease(product.id)}>-</button>
                    <span>{quantities[product.id]}</span>
                    <button onClick={() => handleIncrease(product.id)}>+</button>
                  </div>
                  <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
