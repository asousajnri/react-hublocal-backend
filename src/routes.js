const { Router } = require("express");

const routes = Router();

const SessionController = require("./controllers/SessionController");
const UserController = require("./controllers/UserController");
const TaskController = require("./controllers/TaskController");

const authMiddleware = require("./middleware/auth");

// User
routes.post("/signup", UserController.store);

// Session
routes.post("/sessions", SessionController.store);

// AuthMiddleware
routes.use(authMiddleware);

// Tasks
routes.get("/users/:user_id/tasks", TaskController.index);
routes.post("/users/:user_id/tasks", TaskController.store);
routes.put("/users/:user_id/tasks/:task_id", TaskController.update);
routes.delete("/users/:user_id/tasks/:task_id", TaskController.delete);

module.exports = routes;
