const Router = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 16 }).isString(),
  authController.registration
);
//router.post("/login", userController.login);
//router.get("/auth", authMiddleware, userController.checkAuth);

module.exports = router;
