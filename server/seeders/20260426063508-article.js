"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const articles = [];
		const counts = 100;
		for (let i = 0; i < counts; i++) {
			articles.push({
				title: `文章的标题 ${i}`,
				content: `文章的内容 ${i}.`,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Articles", articles, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Articles", null, {});
	},
};
