import React, { useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';

const ProductList = ({ setProducts, setProductToEdit, products }) => {
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [setProducts]);

  return (
    <div style={productListStyle}>
      <h2>All Products</h2>
      {products.map((product) => (
        <div key={product._id} style={productCardStyle}>
          <img src={product.image} alt={product.name} style={productImageStyle} />
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <button
            onClick={() => setProductToEdit(product)}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              margin: '5px',
              cursor: 'pointer',
              borderRadius: '3px',
            }}
          >
            Edit
          </button>
          <DeleteProduct productId={product._id} setProducts={setProducts} />
        </div>
      ))}
    </div>
  );
};

const productListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const productCardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  borderRadius: '5px',
  width: '200px',
  textAlign: 'center',
};

const productImageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
};

export default ProductList;
