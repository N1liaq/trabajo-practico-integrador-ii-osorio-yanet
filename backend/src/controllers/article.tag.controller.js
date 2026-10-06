import { ArticleTagModel } from "../models/article.tag.model.js";

export const createArticleTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { article_id, tag_id } = validatedData;

    if (article_id && tag_id) {
      const relationExists = await ArticleTagModel.findOne({
        where: { article_id, tag_id },
      });
      if (relationExists) {
        return res.status(400).json("¡Ya existe un tag con ese article!");
      }
    }
    await ArticleTagModel.create(validatedData);

    return res.status(201).json(validatedData);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;
    const userRoleDeleteExists = await ArticleTagModel.findByPk(id);

    if (!userRoleDeleteExists) {
      return res.status(400).json({
        message: "¡El tag que busca no fue encontrado!",
      });
    }

    await userRoleDeleteExists.destroy();
    res
      .status(200)
      .json({ message: "El tag fue eliminado correctamente del article." });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
