const { Router } = require("express");
const collaborationController = require("./collaborationController");
const authMiddleware = require("../../middleware/auth");

const collaborationRouter = Router();

collaborationRouter.post("/collaboration/project/create", authMiddleware, collaborationController.handleProjectCreate);

module.exports = collaborationRouter;
