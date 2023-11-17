import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user';
import oderRouter from './routes/oder';
import foodRouter from './routes/food';
import { sequelize } from './instances/mysql';
//import {upload} from './upload'

import { storage } from './upload';
import multer from 'multer';





dotenv.config();

const upload = multer({storage:storage})

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended:true}))
app.use("/images", express.static(path.join(__dirname, './uploads')))

app.use(express.json())

app.get('/upload', upload.single('uploads'), (req, res) => {
    return res.json(req.file?.filename)
})


app.use(userRouter, oderRouter, foodRouter);




(async () => {
    await sequelize.sync({}); //alter:true
  
  })();

app.listen(3000, () => console.log('server is running'));



