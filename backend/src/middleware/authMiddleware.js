import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Validar si el usuario envía un token válido
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    }

    req.user = user; // contiene id, email, rol
    next();
  });
};

// Verificar si el usuario tiene el rol necesario
export const authorizeRole = (rolesPermitidos) => {
  return (req, res, next) => {
    const rolUsuario = req.user.rol; 

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({
        message: "No tienes permisos para realizar esta acción."
      });
    }

    next();
  };
};
