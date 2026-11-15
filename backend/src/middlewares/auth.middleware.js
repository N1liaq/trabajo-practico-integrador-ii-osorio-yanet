import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const decoded = verifyToken(token);

    req.DataUserLogged = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
