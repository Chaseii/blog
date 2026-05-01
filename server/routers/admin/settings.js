const express = require("express");
const router = express.Router();
const { Setting } = require("../../models");
const { NotFundError, success, failure } = require("../../utils/response");

/**
 * 查询详情
 * GET /admin/settings/:id
 */
router.get("/", async (req, res) => {
	try {
		const setting = await getSettingById();
		success(res, "获取设置详情成功", setting);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 更新详情
 * PUT /admin/settings/:id
 */
router.put("/", async (req, res) => {
	const { name, icp, copyright } = req.body;
	try {
		const setting = await getSettingById();
		setting.name = name;
		setting.icp = icp;
		setting.copyright = copyright;
		await setting.save();
		success(res, "更新设置成功", setting);
	} catch (error) {
		failure(res, error);
	}
});

/**
 * 查询数据库获取文章详情
 */
async function getSettingById() {
	const setting = await Setting.findByPk(1);
	if (!setting) {
		throw new NotFundError(`id 为 ${1} 的设置不存在`);
	}
	return setting;
}

module.exports = router;
