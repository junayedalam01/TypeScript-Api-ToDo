// import { Router } from "express";
// import TodoAdd from "../controllers/todo.controllers.ts";

// const todoRouter = Router();

// todoRouter.get("/todo", TodoAdd);

// export default todoRouter;
// src/routes/todo.routes.ts
import { Router } from "express";
import { TodoAdd, TodoGet,TodoFind ,TodoUpdate,TodoDelete} from "../controllers/todo.controllers";

const todoRouter = Router();

todoRouter.get("/todo", TodoGet);
todoRouter.post("/todo", TodoAdd);
todoRouter.get("/todo/:id", TodoFind);
todoRouter.put("/todo/:id", TodoUpdate);
todoRouter.patch("/todo/:id", TodoUpdate);
todoRouter.delete("/todo/:id",TodoDelete);



export default todoRouter;