const Router = require("koa-router");

const user = require("./user");
const quiz = require("./quiz");
const lecture = require("./lecture");
const keyword = require("./keyword");

const router = new Router();

router.use("/register", user.routes());
router.use("/ask", quiz.routes());
router.use("/show", lecture.routes());
router.use("/word", keyword.routes()); 

module.exports = router;