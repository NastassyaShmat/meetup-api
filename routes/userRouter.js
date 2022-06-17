const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 16 }).isString(),
  authController.registration
);
router.post("/login", authController.login);

module.exports = router;
