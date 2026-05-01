const express = require("express");
const router = express.Router();
const { Category } = require("../../models");
const { Op } = require("sequelize");
const paginate = require("../../utils/pagination");
const { NotFundError, success, failure } = require("../../utils/response");

/**
 * 获取文章列表
 * GET /admin/categories
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

		if (query.name) {
			condition.where = {
				name: {
					[Op.like]: `%${query.name}%`,
				},
			};
		}

		const { count, rows } = await Category.findAndCountAll(condition);

		success(res, "获取分类列表成功", {
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
 * 获取分类详情的逻辑
 * GET /admin/categories/:id
 */
router.get("/:id", async (req, res) => {
	try {
		const category = await getCategoryById(req);
		success(res, "获取分类详情成功", category);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 创建分类的逻辑
 * POST /admin/categories
 */
router.post("/", async (req, res) => {
	const { name, rank } = req.body;
	console.log(name, rank);
	try {
		const newCategory = await Category.create({ name, rank });
		success(res, "创建分类成功", newCategory, 201);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 更新分类的逻辑
 * PUT /admin/categories/:id
 */
router.put("/:id", async (req, res) => {
	const { name, rank } = req.body;
	try {
		const category = await getCategoryById(req);
		category.name = name;
		category.rank = rank;
		await category.save();
		success(res, "更新分类成功", category);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 删除分类的逻辑
 * DELETE /admin/categories/:id
 */
router.delete("/:id", async (req, res) => {
	try {
		const category = await getCategoryById(req);
		await category.destroy();
		success(res, "删除分类成功");
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 查询数据库获取分类详情
 */
async function getCategoryById(req) {
	const id = req.params.id;
	const category = await Category.findByPk(id);
	if (!category) {
		throw new NotFundError(`id 为 ${id} 的分类不存在`);
	}
	return category;
}

module.exports = router;
