"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "邮箱必须填写" },
					notEmpty: { msg: "邮箱不能为空" },
					isEmail: { msg: "邮箱格式不正确" },
					async isUnique(value) {
						const user = await User.findOne({ where: { email: value } });
						if (user) {
							throw new Error("邮箱已存在，请直接登录");
						}
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "用户名必须填写" },
					notEmpty: { msg: "用户名不能为空" },
					len: {
						args: [2, 45],
						msg: "用户名长度必须在 2 到 45 字符之间",
					},
					async isUnique(value) {
						const user = await User.findOne({ where: { username: value } });
						if (user) {
							throw new Error("用户名已存在，请直接登录");
						}
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "密码必须填写" },
					notEmpty: { msg: "密码不能为空" },
				},
				set(value) {
					if (!value) throw new Error("密码不能为空");
					if (value.length >= 6 && value.length <= 45) {
						this.setDataValue("password", bcrypt.hashSync(value, 10));
					} else {
						throw new Error("密码长度必须在 6 到 45 字符之间");
					}
				},
			},
			nickname: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "昵称必须填写" },
					notEmpty: { msg: "昵称不能为空" },
					len: {
						args: [2, 45],
						msg: "昵称长度必须在 2 到 45 字符之间",
					},
				},
			},
			sex: {
				type: DataTypes.TINYINT,
				validate: {
					isIn: {
						args: [[0, 1, 9]],
						msg: "性别必须是 0（男）、1（女）或 9（未选择）",
					},
				},
			},
			company: DataTypes.STRING,
			introduce: DataTypes.TEXT,
			role: {
				type: DataTypes.TINYINT,
				validate: {
					isIn: {
						args: [[0, 100]],
						msg: "用户组必须是 0（普通用户）或 100（管理员）",
					},
				},
			},
			avatar: {
				type: DataTypes.STRING,
				validate: {
					isUrl: { msg: "图片地址不正确" },
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
