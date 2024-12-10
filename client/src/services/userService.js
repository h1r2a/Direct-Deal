import api from './api';
import toastr from 'toastr';
import decodeToken from './jwt';
const userService = {
  getUserInfo: async () => {
    try {
      const response = await api.get('/api/user/info'); // Utilisation de chemin relatif
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  logout: (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toastr.info('You are logged out now');
  },

  login: async function(navigate, credentials) {
    try {
      // 1. Envoi de la requête de connexion
      const response = await api.post('/api/users/login', credentials);
      const token = response.data;

      // 2. Stockage du token brut dans localStorage
      localStorage.setItem('token', token);

      // 3. Décodage du token pour obtenir les données
      const decodedToken = decodeToken(token);

      // 4. Stockage dynamique de chaque clé-valeur du token dans localStorage
      Object.keys(decodedToken).forEach(key => {
        // Pour chaque clé du token, on la stocke dans localStorage
        localStorage.setItem(key, decodedToken[key]);
      });

      // 5. Affichage d'une notification de succès
      toastr.success('Login successfully');

      // 6. Redirection vers la page d'accueil
      navigate('/');
    } catch (error) {
      // 7. Gestion des erreurs
      toastr.error(error.response.data.message);
    }
  }
};

export default userService;
