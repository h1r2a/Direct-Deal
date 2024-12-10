import api from './api';
import toastr from 'toastr';

const productService = {
  // Méthode pour récupérer tous les produits sans pagination
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      console.log(error);
      toastr.error('Failed to fetch products');
      throw error;
    }
  },

  // Méthode pour récupérer les produits avec pagination
  getPaginatedProducts: async (page = 1, sortOrder = 'desc') => {
    try {
      const response = await api.get(`/api/products/paginated`, {
        params: { page, sortOrder }
      });
      return response;
    } catch (error) {
      console.log(error);
      toastr.error('Failed to fetch paginated products');
      throw error;
    }
  },

  // Méthode pour créer un produit
  createProduct: async (productData) => {
    try {
      const response = await api.post('/api/products/create', productData);
      return response;
    } catch (error) {
      console.log(error);
      toastr.error(error.response?.data?.message || 'Failed to create product');
      throw error;
    }
  },

  // Méthode pour uploader un fichier associé à un produit
  uploadProduct: async (productId, fileData) => {
    const formData = new FormData();
    formData.append('file', fileData); // Ajouter le fichier au FormData

    try {
      const response = await api.post(`/api/products/upload/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indiquer que c'est un formulaire multipart
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      toastr.error(error.response?.data?.message || 'Failed to upload product file');
      throw error;
    }
  },


  searchProductsByName: async (nameString) => {
    try {
      const response = await api.get('/api/products/search', {
        params: { nameString },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      toastr.error(error.response?.data?.message || 'Failed to search for products');
      throw error;
    }
  },
};

export default productService;
