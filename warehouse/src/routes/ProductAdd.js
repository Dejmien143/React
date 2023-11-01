import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const [product, setProduct] = useState({
    code: '',
    name: '',
    description: '',
    category: 0,
    quantity: 0,
    measure: 'kg',
    price: '0',
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    if (categories.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: categories[0].id,
      }));
    }
  }, [categories]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: parseInt(value, 10),
      }));
    }
    else if (name === 'quantity') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: parseFloat(value),
      }));
    }
    else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.code.length > 8) {
      alert('Product code must be up to 8 characters.');
      return;
    }

    if (products.some((p) => p.code === product.code)) {
      alert('Product code must be unique.');
      return;
    }



    if (product.name.length > 16) {
      alert('Product name must be up to 16 characters.');
      return;
    }

    if (isNaN(product.quantity) || parseFloat(product.quantity) <= 0) {
      alert('Product quantity must be a positive number.');
      return;
    }

    if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      alert('Product price must be a positive number.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/products', product);
      console.log('Product created successfully');

      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group >
              <Form.Label>Product Code:</Form.Label>
              <Form.Control type="text" name="code" value={product.code} onChange={handleChange} required />
            </Form.Group>

            <Form.Group >
              <Form.Label>Product Name:</Form.Label>
              <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group >
              <Form.Label>Product Description:</Form.Label>
              <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group >
              <Form.Label>Product Category:</Form.Label>
              <Form.Control as="select" name="category" value={product.category} onChange={handleChange} required >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group >
              <Form.Label>Product Quantity:</Form.Label>
              <Form.Control type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
            </Form.Group>

            <Form.Group >
              <Form.Label>Unit of Measure:</Form.Label>
              <Form.Control as="select" name="measure" value={product.measure} onChange={handleChange} required >
                <option value="kg">kg</option>
                <option value="pcs">pcs</option>
                <option value="litre">litre</option>
              </Form.Control>
            </Form.Group>

            <Form.Group style={{ marginBottom: '20px' }}>
              <Form.Label>Product Unit Price:</Form.Label>
              <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
            </Form.Group>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Button variant="primary" type="submit"> Add Product </Button>
              <div style={{ width: '10px' }}></div>
              <LinkContainer to="/">
                <Button variant="secondary">Cancel</Button>
              </LinkContainer>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>

  );
};

export default ProductForm;