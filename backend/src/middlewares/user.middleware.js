import { ArticleModel } from "../models/article.model.js";

export const userMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole === "admin") {
      return next();
    }

    const article = await ArticleModel.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (article.user_id !== userId) {
      return res.status(403).json({ message: "Acceso denegado." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
