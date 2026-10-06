import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";

export const createArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await ArticleModel.create(validatedData);
    return res.status(201).json(validatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
export const getAllArticles = async (req, res) => {
  try {
    const tags = await ArticleModel.findAll();

    return res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;
    const articleIdExists = await ArticleModel.findByPk(id);

    if (!articleIdExists) {
      return res
        .status(400)
        .json({ message: "¡El article que está buscando no fue encontrado!" });
    }
    return res.status(200).json(articleIdExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const articles = await ArticleModel.findAll({
      where: { status: "published" },
      include: [
        { model: UserModel, as: "author", attributes: ["id", "username"] },
        { model: TagModel, as: "tags", through: { attributes: [] } },
      ],
    });
    return res.status(200).json({ articles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getMyArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: { model: Tag, as: "tags", through: { attributes: [] } },
    });

    if (!article) {
      return res
        .status(404)
        .json({ message: "¡El article que está buscando no fue encontrado!" });
    }

    return res.status(200).json({ article });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id } = validatedData;

    const articleExists = await ArticleModel.findByPk(id);

    if (!articleExists) {
      return res.status(400).json({
        message: "¡El article que está buscando no fue encontrado!",
      });
    }

    await articleExists.update(validatedData);

    await articleExists.reload();

    return res.status(201).json(articleExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id } = validatedData;

    const articleExists = await ArticleModel.findByPk(id);

    if (!articleExists) {
      return res.status(400).json({
        message: "¡El article que está buscando no fue encontrado!",
      });
    }

    await articleExists.destroy();
    res
      .status(200)
      .json({ message: "El article fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
