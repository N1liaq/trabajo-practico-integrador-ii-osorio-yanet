import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await TagModel.create(validatedData);
    return res.status(201).json(validatedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllTag = async (req, res) => {
  try {
    const tags = await TagModel.findAll();

    return res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getTagById = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const { id } = validatedData;
    const tagIdExists = await TagModel.findByPk(id);

    if (!tagIdExists) {
      return res
        .status(400)
        .json({ message: "¡El tag que está buscando no fue encontrado!" });
    }
    return res.status(200).json(tagIdExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id } = validatedData;

    const tagExists = await TagModel.findByPk(id);

    if (!tagExists) {
      return res.status(400).json({
        message: "¡El tag que está buscando no fue encontrado!",
      });
    }

    await tagExists.update(validatedData);

    await tagExists.reload();

    return res.status(201).json(tagExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const { id } = validatedData;

    const tagExists = await TagModel.findByPk(id);

    if (!tagExists) {
      return res.status(400).json({
        message: "¡El tag que está buscando no fue encontrado!",
      });
    }

    await tagExists.destroy();
    res.status(200).json({ message: "El tag fue eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
