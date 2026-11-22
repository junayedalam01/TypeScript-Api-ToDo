import config from "../config/config.ts";
import mongoose from "mongoose";

export default function DB(){
   mongoose.connect(config.MONGODB)
   console.log("connect");
}

