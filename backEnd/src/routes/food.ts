import { Router } from "express";
import { Request, Response } from "express";
import * as foodController from '../controllers/foodController';
import { Auth } from "../middlewares/auth";
import { query, validationResult } from 'express-validator';

const foodRouter = Router();

foodRouter.get('/foods', foodController.All);
foodRouter.post('/foods', foodController.createFood);

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
foodRouter.put("/food/:id", foodController.editFood);


export default foodRouter;