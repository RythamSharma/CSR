import express from "express";
import connectDB from "./db/db.js";
import userrouter from "./routers/user.router.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
const app = express();
const port = 3001;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(__dirname, 'templates');

app.use(express.static(staticPath));
app.use("/user", userrouter);
connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err)=>{
    console.log(err)
  })
