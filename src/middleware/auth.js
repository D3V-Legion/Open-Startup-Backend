const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // Asegúrate de usar una variable de entorno

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verificar el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    // Guardar el ID del usuario en `req.userId` para uso posterior
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
