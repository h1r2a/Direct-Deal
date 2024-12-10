// Product.js
import React, { useEffect, useState } from 'react';
import './product.css';
import { FaSearch } from "react-icons/fa";
import productService from '../../services/productService';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CreateProduct from './CreateProduct';
import categoryService from '../../services/categoryService';
import toastr from 'toastr';

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1); // État pour la page actuelle
  const [totalPages, setTotalPages] = useState(1);
  const [catList, setCatList] = useState([{ name: "All categories" }]);
  const [categorySelected, setCategorySelected] = useState('');


  const getAllCategories = async () => {
    try {
      const categories = await categoryService.getAllCategories();
      setCatList([...catList, ...categories]);

    } catch (error) {
      toastr.error("Error");
    }
  }

  const getProducts = async () => {
    try {
      const response = await productService.getPaginatedProducts(page); // Remplacez par la fonction paginée
      setProductList(response.data.products); // Supposons que les produits sont dans response.data.products
      setTotalPages(response.data.totalPages); // Supposons que totalPages est renvoyé dans response.data.totalPages
    } catch (error) {
      console.error("Failed to fetch paginated products:", error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getProducts();
  }, [page]);

  // Callback function to refresh the product list after a new product is created
  const handleProductCreated = () => {
    setPage(1);

    getProducts();
  };

  return (
    <div className='pr-ct'>
      <div className="pr-header">
        <select className="category-dropdown">
          {catList.map((category) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>

        <div className="searchBar">
          <input type="text" placeholder="Search products..." />
          <FaSearch className='search-icon' />
        </div>
      </div>
      <div className="pr-body">
        <div className="pr-left">
          <div className="pr-list">
            {productList.map((product) => (
              <div key={product._id} className="product-card">
                <div className="pr-info">
                  <img src={`./uploads/product/${product.imageName}`} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-category">{product.category.name}</p>
                    <p className="product-quantity">Remaining: {product.quantity}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
                <div className="product-actions ">
                  <CiEdit className='icons icons edit-bt' />
                  <MdOutlineDeleteOutline className='icons icons delete-bt' />
                </div>
              </div>
            ))}
          </div>
          <div className="pr-pagination">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>

        </div>
        <div className="pr-right">
          {/* Pass the callback to CreateProduct */}
          <CreateProduct onProductCreated={handleProductCreated} />
        </div>
      </div>
    </div>
  );
};

export default Product;
