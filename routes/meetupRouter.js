const Router = require("express");
const router = new Router();
const meetupController = require("../controllers/meetupController");
const checkRole = require("../middlewares/checkRoleMiddleware");
const { body } = require("express-validator");

router.post(
  "/",
  checkRole("ADMIN"),
  body("meetupDate").isISO8601(),
  meetupController.create
);
router.get("/:id", meetupController.getById);
router.get("/", meetupController.getAll);
router.put("/:id", meetupController.update);
router.delete("/:id", meetupController.delete);

module.exports = router;
