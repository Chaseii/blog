const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const { Op } = require("sequelize");
const paginate = require("../../utils/pagination");
const { NotFundError, success, failure } = require("../../utils/response");

/**
 * 获取用户列表
 * GET /admin/users
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

		const { count, rows } = await User.findAndCountAll(condition);

		success(res, "获取用户列表成功", {
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
 * 获取用户详情的逻辑
 * GET /admin/users/:id
 */
router.get("/:id", async (req, res) => {
	try {
		const user = await getUserById(req);
		success(res, "获取用户详情成功", user);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 创建用户的逻辑
 * POST /admin/users
 */
router.post("/", async (req, res) => {
	const body = filterBody(req);
	try {
		const newUser = await User.create(body);
		success(res, "创建用户成功", newUser);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 更新用户的逻辑
 * PUT /admin/users/:id
 */
router.put("/:id", async (req, res) => {
	const body = filterBody(req);
	try {
		const user = await getUserById(req);
		await user.update(body);
		success(res, "更新用户成功", user);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 查询数据库获取用户详情
 */
async function getUserById(req) {
	const id = req.params.id;
	const user = await User.findByPk(id);
	if (!user) {
		throw new NotFundError(`id 为 ${id} 的用户不存在`);
	}
	return user;
}

function filterBody(req) {
	return {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		nickname: req.body.nickname,
		sex: req.body.sex,
		company: req.body.company,
		introduce: req.body.introduce,
		role: req.body.role,
		avatar: req.body.avatar,
	};
}

module.exports = router;
