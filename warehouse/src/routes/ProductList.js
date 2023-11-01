import React, { useState, useEffect } from 'react';
import {  Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import CategorySummary from "../components/CategorySummary";
import ProductSummary from "../components/ProductSummary";
import axios from 'axios';

import '../App.css';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:5000/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log('Error fetching products:', error));

        fetch('http://localhost:5000/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.log('Error fetching categories:', error));
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (

        <div>
  <div className="summary-container">
    <div className="product-list">
      <h2>Product List</h2>
      <Table striped bordered hover responsive className="table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit of Measure</th>
            <th>Unit Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{categories.find((category) => category.id === product.category)?.name}</td>
              <td>{product.quantity}</td>
              <td>{product.measure}</td>
              <td>{product.price}</td>
              <td>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <LinkContainer to={"/edit/" + product.id}>
                  <Button variant="primary">Edit</Button>
                </LinkContainer>
                <div style={{ width: '10px' }}></div> 
                <Button variant="danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


                    <LinkContainer to="/add"><Button variant="primary">Add</Button></LinkContainer>
                </div>

                

                <div className="category-summary" >
                <ProductSummary products={products} />
                <table class="table">
                <thead></thead>


<tbody>

                    {categories.map((category) => (
                        <tr key={category.id}>
                            <CategorySummary key={category.id}
          categoryId={category.id}
          categoryName={category.name}
          products={products} />
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default ProductList;