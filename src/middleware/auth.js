const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].slice(7);

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verificar el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {

      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    // Guardar el ID del usuario en `req.userId` para uso posterior
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyToken;
