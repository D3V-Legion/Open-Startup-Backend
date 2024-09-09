const { Router } = require("express");
const usersController = require("./usersController");

const router = Router();

//router.get('/', usersController.getUsers);
//router.get('/:id', usersController.getUserById);
router.post("/register", usersController.handleUserRegister);
router.post("/login", usersController.handleUserLogin);
//router.put('/:id', usersController.updateUser);
//router.delete('/:id', usersController.deleteUser);

module.exports = router;
