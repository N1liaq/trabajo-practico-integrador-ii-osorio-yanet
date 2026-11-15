import { matchedData } from "express-validator";
import { sequelize } from "../config/database.js";
import { comparePassword, hashPassword } from "../helpers/bcript.helper.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req, { locations: ["body"] });

    const userExist = await UserModel.findOne({
      where: {
        username,
      },
    });

    if (!userExist) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const token = generateToken({ idUser: userExist.id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(201).json({
      message: "Usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const profile = await ProfileModel.findByPk(id);

    if (!profile) {
      return res
        .status(404)
        .json({ message: "¡El profile que está buscando no fue encontrado!" });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });

    const profileExists = await ProfileModel.findByPk(id);

    if (!profileExists) {
      return res.status(400).json({
        message: "¡El profile que esta buscando no fue encontrado!",
      });
    }
    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente", profileExists });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
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

    const hashedPassword = await hashPassword(password);

    await sequelize.transaction(async (t) => {
      const newUser = await UserModel.create(
        { username, email, password: hashedPassword, role },
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

    return res.status(201).json({
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
