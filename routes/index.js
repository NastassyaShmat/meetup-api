const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const meetupRouter = require("./meetupRouter");

router.use("/auth", userRouter);
router.use("/meetup", meetupRouter);

module.exports = router;
 