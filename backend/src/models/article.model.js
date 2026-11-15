import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TagModel } from "./tag.model.js";

export const ArticleModel = sequelize.define("Article", {
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.STRING(500),
  },
  status: {
    type: DataTypes.ENUM("published", "archived"),
    defaultValue: "published",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

ArticleModel.belongsToMany(TagModel, {
  through: "ArticleTag",
  as: "tags",
  onDelete: "CASCADE",
});

TagModel.belongsToMany(ArticleModel, {
  through: "ArticleTag",
  as: "articles",
  onDelete: "CASCADE",
});
