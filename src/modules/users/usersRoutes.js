const { Router } = require("express");
const usersController = require("./usersController");
const authMiddleware = require("../../middleware/auth");

const usersRouter = Router();

//usersRouter.get('/', usersController.getUsers);
//usersRouter.get('/:id', usersController.getUserById);
usersRouter.post("/register", usersController.handleUserRegister);
usersRouter.post("/login", usersController.handleUserLogin);
usersRouter.get("/user/profile", authMiddleware, usersController.handleGetUserProfile);
//usersRouter.put('/:id', usersController.updateUser);
//usersRouter.delete('/:id', usersController.deleteUser);

module.exports = usersRouter;
