import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user';
import oderRouter from './routes/oder';
import foodRouter from './routes/food';


dotenv.config();

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use(userRouter, oderRouter, foodRouter)


app.listen(3000, () => console.log('server is running'));



