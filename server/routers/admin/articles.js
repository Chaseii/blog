const express = require("express");
const router = express.Router();
const { Article } = require("../../models");
const { Op } = require("sequelize");
const paginate = require("../../utils/pagination");
const { NotFundError, success, failure } = require("../../utils/response");

/**
 * 获取文章列表
 * GET /admin/articles
 */
router.get("/", async (req, res) => {
	const query = req.query;

	// 处理分页参数
	const { limit, offset, currentPage, pageSize } = paginate(
		query.page,
		query.pageSize,
	);

	try {
		const condition = {
			order: [["id", "DESC"]],
			limit: limit,
			offset: offset,
		};

		if (query.title) {
			condition.where = {
				title: {
					[Op.like]: `%${query.title}%`,
				},
			};
		}

		const { count, rows } = await Article.findAndCountAll(condition);

		success(res, "获取文章列表成功", {
			rows: rows,
			total: count,
			page: currentPage,
			pageSize: pageSize,
		});
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 获取文章详情的逻辑
 * GET /admin/articles/:id
 */
router.get("/:id", async (req, res) => {
	try {
		const article = await getArticleById(req);
		success(res, "获取文章详情成功", article);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 创建文章的逻辑
 * POST /admin/articles
 */
router.post("/", async (req, res) => {
	const { title, content } = req.body;
	try {
		const newArticle = await Article.create({ title, content });
		success(res, "创建文章成功", newArticle);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 更新文章的逻辑
 * PUT /admin/articles/:id
 */
router.put("/:id", async (req, res) => {
	const { title, content } = req.body;
	try {
		const article = await getArticleById(req);
		article.title = title;
		article.content = content;
		await article.save();
		success(res, "更新文章成功", article);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 删除文章的逻辑
 * DELETE /admin/articles/:id
 */
router.delete("/:id", async (req, res) => {
	try {
		const article = await getArticleById(req);
		await article.destroy();
		success(res, "删除文章成功");
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 查询数据库获取文章详情
 */
async function getArticleById(req) {
	const id = req.params.id;
	const article = await Article.findByPk(id);
	if (!article) {
		throw new NotFundError(`id 为 ${id} 的文章不存在`);
	}
	return article;
}

module.exports = router;
