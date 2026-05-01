"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Courses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER.UNSIGNED,
			},
			categoryId: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			image: {
				type: Sequelize.STRING,
			},
			recommended: {
				type: Sequelize.TINYINT.UNSIGNED,
				allowNull: false,
				defaultValue: 0,
			},
			introductory: {
				type: Sequelize.TINYINT.UNSIGNED,
				allowNull: false,
				defaultValue: 0,
			},
			content: {
				type: Sequelize.TEXT,
			},
			likesCount: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
				defaultValue: 0,
			},
			chaptersCount: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.addIndex("Courses", {
			fields: ["categoryId"],
		});
		await queryInterface.addIndex("Courses", {
			fields: ["userId"],
		});
		await queryInterface.addIndex("Courses", {
			fields: ["recommended"],
		});
		await queryInterface.addIndex("Courses", {
			fields: ["introductory"],
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Courses");
	},
};
