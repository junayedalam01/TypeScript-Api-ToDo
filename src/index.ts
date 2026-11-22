import express from "express";
import morgan from "morgan";
import DB from "./database/database.ts";
import todoRouter from "./routes/todo.routes";

export const app = express();




app.use(express.json());

app.use(morgan("dev"));


app.use("/api/v1",todoRouter);





// app.get("/",(req,res) =>{
//   res.send("hello");
// })
// app.get("/health", (req, res) => {
//   res.json({ ok: true });
// });

app.listen(3000, () => {
  console.log("http://localhost:3000")
  DB();


}

);