import express from "express";
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectTo from "./database/database.js";
import imageRoute from "./routes/imageRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import rateLimiter from "./middleware/rateLimiterMiddle.js";

let app = express();

let __dirname = path.resolve()
dotenv.config();

app.use(rateLimiter())
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/image', imageRoute)
app.use('/auth', authRoutes)

app.use('/imagesFolder', express.static(path.join(__dirname, "backend", "imageFolder"), {
  setHeaders : (res, path, stat)=> {
    if(path.includes('latest')){
      res.setHeader('Cache-Control' , 'no-store')
    } else {
      res.setHeader('Cache-Control','private, max-age=60')
    }
  }
}));


if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.join(__dirname,"/frontend/dist")))

  app.get("*",(req,res)=> {
    res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'));
  })
}


app.listen(3000, () => {
  connectTo();
  console.log('server started')
})