// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const authenticateToken =  (req,res,next)=>{
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

//     if(!token){
//         return res.status(403).json({message: "Missing token"});
//     }

//     jwt.verify(token,process.env.JWT_SECRET, (err,payload)=>{
//         if(err){
//             return res.status(403).json({message : "Invalid or Expired token"});
//         }

//         req.payload = payload;
//         next();
//     });

// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(403).json({ message: "Missing token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Vérification du rôle dans le payload
      const userRole = payload.role;
      if (userRole === 'Admin' || userRole === requiredRole) {
        req.payload = payload;
        next();
      } else {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }
    });
  };
};

module.exports = authenticateToken;
