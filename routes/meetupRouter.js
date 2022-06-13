const Router = require("express");
const router = new Router();
const meetupController = require("../controllers/meetupController");
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post("/", checkRole('ADMIN'), meetupController.create);
router.get("/:id", meetupController.getById);
router.get("/", meetupController.getAll);
router.put("/:id", meetupController.update);
router.delete("/:id", meetupController.delete);

module.exports = router;
