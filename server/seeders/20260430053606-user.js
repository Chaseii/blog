"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				username: "admin",
				password: bcrypt.hashSync("admin123", 10),
				email: "admin@example.com",
				nickname: "admin",
				sex: 1,
				company: "Example Inc.",
				introduce: "I am the administrator.",
				role: 100,
				avatar: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "user1",
				password: "123123123",
				email: "user1@example.com",
				nickname: "User 1",
				sex: 0,
				company: "Example Inc.",
				introduce: "I am a regular user.",
				role: 0,
				avatar: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Users", null, {});
	},
};
