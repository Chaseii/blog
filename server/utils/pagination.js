/**
 * 设置分页参数
 * @param {*} page 入参页码
 * @param {*} pageSize 入参每页条数
 * @returns {Object} 分页参数对象
 */
module.exports = (page, pageSize) => {
	// 当前是第几页
	const currentPage = Math.abs(Number(page)) || 1;
	// 每页多少条数据
	const pageSizeNum = Math.abs(Number(pageSize)) || 10;
	// 计算偏移量
	const offset = (currentPage - 1) * pageSizeNum;

	return {
		limit: pageSizeNum,
		offset: offset,
		currentPage: currentPage,
		pageSize: pageSizeNum,
	};
};
