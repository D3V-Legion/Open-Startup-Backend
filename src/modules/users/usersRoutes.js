const { Router } = require("express");
const usersController = require("./usersController");
const verifyToken = require("../../middleware/auth");

const router = Router();

//router.get('/', usersController.getUsers);
//router.get('/:id', usersController.getUserById);
router.post("/register", usersController.handleUserRegister);
router.post("/login", usersController.handleUserLogin);
router.get("/profile", verifyToken, usersController.handleGetUserProfile);
//router.put('/:id', usersController.updateUser);
//router.delete('/:id', usersController.deleteUser);

module.exports = router;
