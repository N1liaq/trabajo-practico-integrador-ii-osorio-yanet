import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { sequelize } from "../config/database.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";

export const createProfileUser = async (req, res) => {
  try {
    const dataValidated = matchedData(req);
    const {
      username,
      email,
      password,
      role,
      first_name,
      last_name,
      biography,
      avatar_url,
    } = dataValidated;

    const result = await sequelize.transaction(async (t) => {
      const newUser = await UserModel.create(
        { username, email, password, role },
        {
          transaction: t,
        },
      );

      const newProfile = await ProfileModel.create(
        { first_name, last_name, biography, avatar_url, user_id: newUser.id },

        { transaction: t },
      );

      return { user: newUser, profile: newProfile };
    });

    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
        {
          model: ArticleModel,
          as: "articles",
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const userExists = await UserModel.findByPk(id);

    if (!userExists) {
      return res
        .status(400)
        .json("¡El user que esta buscando no fué encontrado!");
    }

    return res.status(200).json(userExists);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const userExists = await UserModel.findByPk(id);

    if (!userExists) {
      return res.status(400).json({
        message: "¡El ID del user que esta buscando no fue encontrado!",
      });
    }

    const userUpdateExists = await userExists.update(validatedDataBody);

    return res
      .status(201)
      .json({ message: "User editado correctamente.", user: userUpdateExists });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const userExists = await UserModel.findByPk(id);

    if (!userExists) {
      return res.status(400).json({
        message: "¡El ID del user que esta buscando no fue encontrado!",
      });
    }

    await userExists.destroy();
    res
      .status(200)
      .json({ message: "El usuario fue eliminado correctamente." });
    // await sequelize.transaction(async (t) => {
    //   const userExists = await UserModel.findByPk(id, { transaction: t });

    //   if (!userExists) {
    //     return res.status(404).json({
    //       message: "¡El user que está buscando no fue encontrado!",
    //     });
    //   }
    //   const profileExists = await ProfileModel.findOne({
    //     where: { user_id: id },
    //     transaction: t,
    //   });

    //   if (!profileExists) {
    //     return res.status(404).json({
    //       message: "¡El profile que está buscando no fue encontrado!",
    //     });
    //   }

    //   await profileExists.destroy();
    //   await userExists.destroy();

    //   return res.status(200).json({
    //     message:
    //       "El profile y su user asociado fueron eliminados correctamente.",
    //   });
    // });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
