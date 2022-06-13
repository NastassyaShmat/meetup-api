const Router = require("express");
const router = new Router();
const meetupController = require("../controllers/meetupController");

router.post("/", meetupController.create);
router.get("/:id", meetupController.getById);
router.get("/", meetupController.getAll);
router.put("/:id", meetupController.update);
router.delete("/:id", meetupController.delete);

module.exports = router;
