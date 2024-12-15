import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProduct = ({ productToEdit, setProductToEdit, setProducts }) => {
  const [product, setProduct] = useState(productToEdit);

  useEffect(() => {
    setProduct(productToEdit);
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/products/${product._id}`, product)
      .then(response => {
        setProducts(prevProducts => prevProducts.map(p => p._id === product._id ? response.data.data : p));
        setProductToEdit(null); // Close the edit form
      })
      .catch(error => console.error("There was an error updating the product:", error));
  };

  if (!product) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
