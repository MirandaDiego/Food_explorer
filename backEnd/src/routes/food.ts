import { Router } from "express";
import { Request, Response } from "express";
import * as foodController from '../controllers/foodController';
import { query, validationResult } from 'express-validator';
//import uploads from "../upload";
import { storage } from "../upload";
import multer from "multer";


const upload = multer({ storage: storage})

const foodRouter = Router();

foodRouter.get('/foods', foodController.All);
foodRouter.post('/foods', upload.single('image'),  foodController.createFood);

foodRouter.get('/foods/search', [
    query('name').optional().isString(),
    query('ingredients').optional().isString(),
], async (req:Request, res:Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    foodController.findByNameOrIngredients(req, res);
});
//http://localhost:5000/foods/search?ingredients=fk
//http://localhost:5000/foods/search?name=fk

foodRouter.delete('/food/:id', foodController.deleteFood);
foodRouter.put("/food/:id",upload.single('image'), foodController.editFood);

foodRouter.get("/:id", foodController.findOne);
//foodRouter.get("/:name", foodController.findOne);


export default foodRouter;