import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Productssupload.css';

const Productupload = () => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductImageChange = (e) => setProductImage(e.target.files[0]);
  const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
  const handleProductCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "new-category") {
      setProductCategory("");
      setShowNewCategory(true);
    } else {
      setProductCategory(selectedCategory);
      setShowNewCategory(false);
    }
  };
  const handleProductSizeChange = (e) => setProductSize(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleQuantityIncrease = () => setProductQuantity((prevQuantity) => prevQuantity + 1);
  const handleQuantityDecrease = () => setProductQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  const handleNewCategoryChange = (e) => setNewCategory(e.target.value);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/');
      const sortedProducts = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('image', productImage);
      formData.append('description', productDescription);
      formData.append('category_name', productCategory);
      formData.append('size', productSize);
      formData.append('price', productPrice);
      formData.append('quantity', productQuantity);

      const response = await axios.post('http://127.0.0.1:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product uploaded successfully:', response.data);
      fetchProducts(); // Fetch the updated list of products
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading product:', error);
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductCategory(product.category_name);
    setProductSize(product.size);
    setProductPrice(product.price);
    setProductQuantity(product.quantity);
    showCard();
    document.querySelector('.card-header h2').innerHTML = "UPDATE";
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', productName);
      if (productImage) {
        formData.append('image', productImage);
      }
      formData.append('description', productDescription);
      formData.append('category_name', productCategory);
      formData.append('size', productSize);
      formData.append('price', productPrice);
      formData.append('quantity', productQuantity);

      const response = await axios.put(`http://127.0.0.1:8000/api/products/${editingProduct.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product updated successfully:', response.data);
      setEditingProduct(null);
      fetchProducts(); // Fetch the updated list of products
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    setIsLoading(true);

    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`);

      console.log('Product deleted successfully');
      fetchProducts(); // Fetch the updated list of products
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory && !categories.some(cat => cat.name === newCategory)) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/categories/', { name: newCategory });
        setCategories([...categories, response.data]);
        setProductCategory(response.data.name); // Select the newly added category
        setNewCategory('');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const hideCard = () => {
    document.querySelector('.card-header h2').innerHTML = "Upload";
    document.querySelector('.product-upload').classList.add('d-none');
  };

  const showCard = () => {
    document.querySelector('.product-upload').classList.remove('d-none');
  };

  return (
    <div className="product-upload-container">
      <div className='product-upload card my-4 d-none'>
        <div className='card-header'>
          <h2>Upload</h2>
          <div><i className='bx bx-x' onClick={() => hideCard()}></i></div>
        </div>
        <div className='card-body'>
          <form className="product-upload-form" onSubmit={editingProduct ? handleUpdate : handleUpload}>
            <label> Product Name:</label>
            <input type="text" value={productName} className='form-control' onChange={handleProductNameChange} required />
            <label> Product Image:</label>
            <input type="file" className='form-control' onChange={handleProductImageChange} accept="image/*" />

            <label> Product Description:</label>
            <input type='text' className='form-control' value={productDescription} onChange={handleProductDescriptionChange} required></input>

            <label> Product Category:</label>
            <div className="category-container">
              <select value={productCategory} className='form-control' onChange={handleProductCategoryChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
                <option value="new-category">Add New Category</option>
              </select>
              {showNewCategory && (
                <div className="new-category-input">
                  <input
                    type="text"
                    value={newCategory}
                    className="form-control mt-2"
                    onChange={handleNewCategoryChange}
                    placeholder="Enter new category"
                  />
                  <button className="btn btn-secondary mt-2" onClick={handleAddCategory}>Add Category</button>
                </div>
              )}
            </div>

            <label> Product Size:</label>
            <input type="number" value={productSize} className='form-control' onChange={handleProductSizeChange} required />

            <label> Product Price:</label>
            <input type="number" value={productPrice} className='form-control' onChange={handleProductPriceChange} required />

            <label> Product Quantity:</label>
            <div className="quantity-control">
              <button type="button" className='btn btn-dark' onClick={handleQuantityDecrease}>-</button>
              <input type="number" value={productQuantity} className='form-control' onChange={(e) => setProductQuantity(Number(e.target.value))} min="1" required />
              <button type="button" className='btn btn-dark' onClick={handleQuantityIncrease}>+</button>
            </div>

            <button type="submit" className='form-control btn btn-primary' disabled={isLoading}>
              {isLoading ? (editingProduct ? 'Updating...' : 'Uploading...') : (editingProduct ? 'Update Product' : 'Upload Product')}
            </button>
          </form>
        </div>
      </div>
      <div className="search-container input-group">
        <i className='bx bx-search-alt input-group-text'></i>
        <input
          type="search"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='form-control'
        />
      </div>

      <div className="updateproduct card">
        <table className='table'>
          <thead>
            <tr>
              <th>
                <button className='btn btn-primary' onClick={() => showCard()}>+ Add</button>
              </th>
            </tr>
            <tr>
              <th className="product-number">Product Number</th>
              <th className="product-name">Name</th>
              <th className="product-description">Description</th>
              <th className="product-category">Category</th>
              <th className="product-size">Size</th>
              <th className="product-price">Price</th>
              <th className="product-image">Image</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="product-number">{product.id}</td>
                <td className="product-name">{product.name}</td>
                <td className="product-description">{product.description}</td>
                <td className="product-category">{product.category_name}</td>
                <td className="product-size">{product.size}</td>
                <td className="product-price">{product.price}</td>
                <td className="product-image">
                  {product.image && (
                    <img src={`http://localhost:8000${product.image}`} alt={product.name} />
                  )}
                </td>
                <td className="product-quantity">{product.quantity}</td>
                <td className="product-action">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(product)}><i className='bx bx-edit'></i></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}><i className='bx bx-trash'></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default Productupload;
