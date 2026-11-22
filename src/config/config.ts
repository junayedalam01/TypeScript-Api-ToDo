import dotenv from "dotenv";

dotenv.config();

 const  config ={
    MONGODB:process.env.MONDODB_URL,

}

export default config;