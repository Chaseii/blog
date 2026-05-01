class NotFundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFoundError";
	}
}

/**
 * 200 成功
 * 201 创建数据成功
 */
function success(res, message = "操作成功", data = {}, code = 200) {
	res.status(code).json({
		status: true,
		message: message,
		data: data,
	});
}

/**
 * 处理失败响应
 * @param {*} res
 * @param {*} error
 */
function failure(res, error) {
	if (error.name === "SequelizeValidationError") {
		const messages = error.errors.map((err) => err.message);
		res.status(400).json({
			status: false,
			message: "参数验证错误",
			errors: messages,
		});
	}

	if (error.name === "SequelizeUniqueConstraintError") {
		const messages = error.errors.map((err) => err.message);
		res.status(400).json({
			status: false,
			message: "唯一约束错误",
			errors: messages,
		});
	}

	if (error.name === "NotFoundError") {
		res.status(404).json({
			status: false,
			message: "资源不存在",
			errors: [error.message],
		});
	}

	res.status(500).json({
		status: false,
		message: "服务器错误",
		errors: [error.message],
	});
}

module.exports = {
	NotFundError,
	success,
	failure,
};
