import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductEdit = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        code: '',
        name: '',
        description: '',
        category: 0,
        quantity: 0,
        measure: 'kg',
        price: '',
    });
    const [productfirst, setProductfirst] = useState({
        code: '',
        name: '',
        description: '',
        category: 0,
        quantity: 0,
        measure: 'kg',
        price: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
                setProductfirst(data);
            } else {
                alert('Someone already deleted this record');
                navigate('/');
            }

            const productsResponse = await fetch('http://localhost:5000/products/');
            const productsData = await productsResponse.json();
            setProducts(productsData);

            const categoriesResponse = await fetch('http://localhost:5000/categories');
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: parseInt(value, 10),
            }));
        } else if (name === 'quantity') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: parseFloat(value),
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            const fetchedProduct = response.data;

            if (fetchedProduct.code !== productfirst.code) {
                alert('Someone changed the code');
                navigate('/');
                return;
            } else if (fetchedProduct.category !== productfirst.category) {
                alert('Someone changed the category');
                navigate('/');
                return;
            } else if (fetchedProduct.name !== productfirst.name) {
                alert('Someone changed the name');
                navigate('/');
                return;
            } else if (fetchedProduct.quantity !== productfirst.quantity) {
                alert('Someone changed the quantity');
                navigate('/');
                return;
            } else if (fetchedProduct.description !== productfirst.description) {
                alert('Someone changed the description');
                navigate('/');
                return;
            } else if (fetchedProduct.measure !== productfirst.measure) {
                alert('Someone changed the measure');
                navigate('/');
                return;
            } else if (fetchedProduct.price !== productfirst.price) {
                alert('Someone changed the price');
                navigate('/');
                return;
            }

            if (product.code.length > 8) {
                alert('Product code must be up to 8 characters.');
                return;
            }

            if (products.some((p) => p.code === product.code && p.id !== product.id)) {
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

            await axios.put(`http://localhost:5000/products/${id}`, product);
            console.log('Product updated successfully');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('Someone already deleted this record');
                navigate('/');
            } else {
                console.error('Error updating product:', error);
            }
        }
    };


    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="code">Product Code:</Form.Label>
                            <Form.Control type="text" id="code" name="code" value={product.code} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="name">Product Name:</Form.Label>
                            <Form.Control type="text" id="name" name="name" value={product.name} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="description">Product Description:</Form.Label>
                            <Form.Control as="textarea" id="description" name="description" value={product.description} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="category">Product Category:</Form.Label>
                            <Form.Control as="select" id="category" name="category" value={product.category} onChange={handleChange}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="quantity">Product Quantity:</Form.Label>
                            <Form.Control type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="measure">Unit of Measure:</Form.Label>
                            <Form.Control as="select" id="measure" name="measure" value={product.measure} onChange={handleChange}>
                                <option value="kg">kg</option>
                                <option value="pcs">pcs</option>
                                <option value="litre">litre</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group style={{ marginBottom: '20px' }}>
                            <Form.Label htmlFor="price">Product Unit Price:</Form.Label>
                            <Form.Control type="text" id="price" name="price" value={product.price} onChange={handleChange} />
                        </Form.Group>

                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <Button type="submit">Add Product</Button>
                            <div style={{ width: '10px' }}></div> {/* Adjust the width for smaller spacing */}
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

export default ProductEdit;
