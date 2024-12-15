import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data.data); // Set products data
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="App">
      <h1>Product Management</h1>
      <AddProduct setProducts={setProducts} />
      <ProductList products={products} setProductToEdit={setProductToEdit} setProducts={setProducts} />
      {productToEdit && <UpdateProduct productToEdit={productToEdit} setProductToEdit={setProductToEdit} setProducts={setProducts} />}
    </div>
  );
}

export default App;
