const { Router } = require("express");
const collaborationProjectsController = require("./projectsController");
const authMiddleware = require("../../../middleware/auth");

const collaborationRouter = Router();

collaborationRouter.post("/create", authMiddleware, collaborationProjectsController.handleProjectCreate);

module.exports = collaborationRouter;
