import { Request, Response } from "express";
import { Ingredients } from "../models/ingredients";

export const All = async (req:Request, res:Response) => {

    const ingredients = await Ingredients.findAll()

    res.json(ingredients);

}

export const createIngredients = async (req: Request, res: Response) => {
    const { name, id_food } = req.body;

    if (!name || !id_food) {
        return res.status(400).json({ error: 'error' });
    }

    try {
        const newFood = await Ingredients.create({ name, id_food });
        res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar alimento' });
    }
}
