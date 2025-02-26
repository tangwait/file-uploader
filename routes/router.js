const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/", userController.loadHomepage);
router.get("/login", userController.loadLogin);
router.get("/register", userController.loadRegister);








module.exports = router;