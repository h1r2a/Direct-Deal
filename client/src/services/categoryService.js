import api from './api';
import toastr from 'toastr';

const categoryService = {
  // Méthode pour récupérer toutes les catégories
  getAllCategories: async () => {
    try {
      const response = await api.get('/api/categories');
      return response.data;
    } catch (error) {
      console.log(error);
      toastr.error('Failed to fetch categories');
      // throw error;
    }
  },

  // Méthode pour créer une catégorie
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/api/categories/create', categoryData);
      toastr.success('Category created successfully');
      return response.data;
    } catch (error) {
      console.log(error);
      toastr.error('Failed to create category');
      toastr.error(error.response.message);
    }
  },

  // Méthode pour mettre à jour une catégorie
  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/api/categories/update/${categoryId}`, categoryData);
      toastr.success('Category updated successfully');
      return response.data;
    } catch (error) {
      console.log(error);
      toastr.error(error.response.data.message);
    }
  },

  // Méthode pour supprimer une catégorie
  deleteCategory: async (categoryId) => {
    try {
      const response = await api.delete(`/api/categories/delete/${categoryId}`);
      toastr.success('Category deleted successfully');
      return response.data;
    } catch (error) {
      toastr.error(error.response.data.message);
;
      // throw error;
    }
  },
};

export default categoryService;
