
import type { Request, Response } from "express";
import Todo from "../module/todo.modal.ts";

import mongoose from "mongoose";



export const TodoAdd =  (req: Request, res: Response) => {
//   res.status(201).json({ message: "todo added", data: req.body });
const {fullname,username,age,email} =req.body;
console.log(fullname,username,age,email);

const exites =Todo.findOne({$or:[{username:username},{email:email}]});


if(exites){
res.status(401).json({
    "maessage":"email and username is exites"
})
}
const Newtodo =Todo.create({
    fullname:fullname,
    username:username,
    age:age,
    email:email
})

res.status(201).json({
    "maessage":"Todo Add",
    "todo":Newtodo
})


};

export const TodoGet = async (_req: Request, res: Response) => {
//   res.json({ todos: [] });
try{

 const getodo = await Todo.find();

   res.status(201).json({
    "maessage":" show todo All data",
    "todo":getodo
   })





}catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
  

};

export const TodoFind = async (_req:Request,res:Response) =>{
    const {id} =_req.params;


    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const find = await Todo.findById(id);

    if(!find){
        res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "todo found", find });

    
 

}

export const TodoUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { title, done } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, done },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "todo updated", todo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update todo" });
  }
};


export const TodoDelete =async (_req:Request,res:Response) =>{

 try {
    const { id } = _req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "todo deleted", todo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete todo" });
  }

}