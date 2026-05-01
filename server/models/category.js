"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Category.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "分类名称必须唯一",
				},
				validate: {
					notEmpty: {
						msg: "分类名称不能为空",
					},
					notNull: {
						msg: "分类名称必须填写",
					},
					len: {
						args: [2, 45],
						msg: "分类名称长度必须在 2 到 45 字符之间",
					},
				},
			},
			rank: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "排序必须填写",
					},
					notEmpty: {
						msg: "排序不能为空",
					},
					isInt: {
						msg: "排序必须是整数",
					},
					isPositive(value) {
						if (value <= 0) {
							throw new Error("排序必须是正整数");
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Category",
		},
	);
	return Category;
};
