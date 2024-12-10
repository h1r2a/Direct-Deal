import { jwtDecode } from 'jwt-decode';
const decodeToken = (token)=>
 {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);  // Affiche les données du payload du token
      return decoded;
    } catch (error) {
      console.error('Le token est invalide ou expiré', error);
      return null;
    }
  }

  export default decodeToken;