const express = require("express");
const userController = require("../controllers/userControllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", auth, userController.logOutUser);
router.post("/logoutAll", auth, userController.logOutAllUser);
router.get("/me", auth, userController.getUserProfile);
router.put("/me", auth, userController.updateUser);
router.delete("/me", auth, userController.deleteUser);

module.exports = router;
