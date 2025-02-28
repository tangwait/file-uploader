const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const middlewares = require('../middlewares');

router.get("/", userController.loadHomepage);

router.get("/register", userController.loadRegister);
router.post("/register", userController.registerUser);

router.get("/login", userController.loadLogin);
router.post("/login", userController.loginUser);

router.get('/dashboard', middlewares.isAuthenticated, userController.loadDashboard);

router.post('/logout', userController.logOut);




module.exports = router;