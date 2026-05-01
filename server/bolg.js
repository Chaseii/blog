const express = require("express");
const config = require("./config/default");
const adminArticlesRouter = require("./routers/admin/articles");
const adminCategoriesRouter = require("./routers/admin/categories");
const adminSettingsRouter = require("./routers/admin/settings");
const adminUsersRouter = require("./routers/admin/users");

const app = express();

// CORS 中间件
app.all(/.*/, (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	res.header("Content-Type", "application/json;charset=utf-8");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("X-Powered-By", "Express 5.x");
	if (req.method === "OPTIONS") {
		res.sendStatus(200);
	} else {
		next();
	}
});

// 解析请求体（JSON 和 URL 编码格式）
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("/public"));

// 路由
app.use("/admin/articles", adminArticlesRouter);
app.use("/admin/categories", adminCategoriesRouter);
app.use("/admin/settings", adminSettingsRouter);
app.use("/admin/users", adminUsersRouter);
app.listen(config.port, () => {
	console.log(`Blog app listening at http://localhost:${config.port}`);
});
