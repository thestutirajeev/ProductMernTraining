import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ setProducts }) => {
  const [product, setProduct] = useState({ name: '', price: '', image: '' });
  const [message, setMessage] = useState(null); // For success or failure messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/products', product)
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, response.data.data]);
        setProduct({ name: '', price: '', image: '' }); // Clear form
        setMessage({ type: 'success', text: 'Product added successfully!' });
      })
      .catch((error) => {
        console.error("There was an error adding the product:", error);
        setMessage({ type: 'error', text: 'Failed to add product. Try again.' });
      });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded border">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            placeholder="Enter product price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-control"
            placeholder="Enter image URL"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
      {message && (
        <div
          className={`alert mt-3 ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
