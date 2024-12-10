import React, { useEffect, useState } from 'react';
import './category.css';
import categoryService from '../../services/categoryService';
import ConfirmationModal from '../Common/ConfirmationModal/ConfirmationModal';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', code: '' });
    const [editingCategory, setEditingCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const getCategories = async () => {
        const categories = await categoryService.getAllCategories();
        setCategories(categories);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        await categoryService.createCategory(form);
        setForm({ name: '', code: '' });
        getCategories();
    };

    const handleEdit = (category) => {
        setEditingCategory(category._id);
        setForm({ name: category.name, code: category.code });
    };

    const handleUpdate = async () => {
        await categoryService.updateCategory(editingCategory, form);
        setEditingCategory(null);
        setForm({ name: '', code: '' });
        getCategories();
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
        setForm({ name: '', code: '' });
    };

    const openDeleteModal = (id) => {
        setCategoryToDelete(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCategoryToDelete(null);
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        await categoryService.deleteCategory(categoryToDelete);
        setCategoryToDelete(null);
        setIsModalOpen(false);
        getCategories();
    };

    return (
        <div className="category-container">
            <h1>Categories</h1>
            <div className="category-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.code}</td>
                                <td className="actions">
                                    <CiEdit title="Edit" onClick={() => handleEdit(category)} />
                                    <MdOutlineDeleteOutline title="Delete" onClick={() => openDeleteModal(category._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="category-form">
                <h2>{editingCategory ? 'Edit Category' : 'Create Category'}</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Code</label>
                    <input type="text" name="code" value={form.code} onChange={handleInputChange} />
                </div>
                <div className="form-actions">
                    {editingCategory ? (
                        <>
                            <button onClick={handleUpdate} className="update-button">Update</button>
                            <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleCreate} className="create-button">Create</button>
                    )}
                </div>
            </div>
            
            {/* Confirmation Modal */}
            <ConfirmationModal 
                isOpen={isModalOpen} 
                onClose={closeDeleteModal} 
                onConfirm={confirmDelete} 
            />
        </div>
    );
};

export default Category;
