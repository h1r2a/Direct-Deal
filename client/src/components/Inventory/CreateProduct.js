// CreateProduct.js
import React, { useState, useEffect } from 'react';
import './createProduct.css';
import productService from '../../services/productService';
import toastr from 'toastr';
import categoryService from '../../services/categoryService';

const CreateProduct = ({ onProductCreated }) => {
    const emptyProduct = {
        name: '',
        price: 0.0,
        quantity: 0,
        category: ''
    };

    const increaseQuantity = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            quantity: prevFormData.quantity + 1
        }));
    };

    const decreaseQuantity = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            quantity: prevFormData.quantity > 0 ? prevFormData.quantity - 1 : 0
        }));
    };

    const [formData, setFormData] = useState(emptyProduct);
    const [fileProduct, setFileProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryService.getAllCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.log(error);
                toastr.error('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFileProduct(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: name === 'quantity'  ? parseFloat(value) : value
            });
        }
    };


    const handleCreateProduct = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            const createdProduct = await productService.createProduct(formData);
    
            if (createdProduct && createdProduct.status === 201) {
                if (fileProduct) {
                    await productService.uploadProduct(createdProduct.data.product._id, fileProduct);
                    toastr.success('Product created successfully');
                    setFormData(emptyProduct);
                    setFileProduct(null);
                    onProductCreated();  // Appelle le callback pour actualiser la liste des produits
                }
            } else {
                toastr.error("Product creation failed");
            }
        } catch (error) {
            toastr.error("Error while creating product or uploading file");
        }
    };
    
    return (
        <div className='create-pr'>
            <h1>New Product</h1>
            <div className="form-pr">
                <div className="fr-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name='name'
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="fr-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="fr-group">
                    <label>Price</label>
                    <input
                        type="number"
                        step={'any'}
                        name='price'
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="fr-group quantity-group">
                    <label>Quantity</label>
                    <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => { decreaseQuantity() }}>-</button>
                        <input
                            type="text"
                            name="quantity"
                            placeholder="0"
                            value={formData.quantity}
                            onChange={handleChange}

                        />
                        <button className="quantity-btn" onClick={() => { increaseQuantity() }}>+</button>
                    </div>
                </div>
                <div className="fr-group">
                    <label>Upload Image</label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div className="button">
                    <button onClick={handleCreateProduct}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
