import React from 'react';
import axios from 'axios';

const DeleteProduct = ({ productId, setProducts }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/products/${productId}`)
      .then(() => {
        // Remove the deleted product from the frontend list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        alert('Product deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete the product.');
      });
  };

  return (
    <button
      className="btn btn-danger"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteProduct;
