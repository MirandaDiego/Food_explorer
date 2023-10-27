import { Request, Response } from "express";
import { Food } from "../models/Foods";
import { Op } from "sequelize";

export const All = async (req: Request, res: Response) => {
    try {
        const foods = await Food.findAll();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alimentos' });
    }
}

export const createFood = async (req: Request, res: Response) => {
    const { image, name, category, description, ingredients, price } = req.body;

    if (!image || !name || !category || !description || !ingredients || !price) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    try {
        const newFood = await Food.create({ image, name, category, description, ingredients, price });
        res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar alimento' });
    }
}

export const deleteFood = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const food = await Food.findByPk(id);
        if (food) {
            await food.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Alimento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir alimento' });
    }
}

export const editFood = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const food = await Food.findByPk(id);
        if (!food) {
            return res.status(404).json({ error: 'Alimento não encontrado' });
        }

        if (req.body.image) {
            food.image = req.body.image;
        }
        if (req.body.name) {
            food.name = req.body.name;
        }
        if( req.body.category){
            food.category = req.body.category
        }
        if(req.body.description){
            food.description = req.body.description
        }
        if(req.body.ingredients){
            food.ingredients =req.body.ingredients
        }
        if(req.body.price){
            food.price = req.body.price
        }

        await food.save();
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar alimento' });
    }
}
export const findByNameOrIngredients = async (req: Request, res: Response) => {
    const { name, ingredients } = req.query as { [key: string]: string | undefined };

    try {
        const whereCondition: Record<string, any> = {};

        if (name) {
            whereCondition['name'] = { [Op.like]: `%${name}%` };
        }

        if (ingredients) {
            whereCondition['ingredients'] = { [Op.like]: `%${ingredients}%` };
        }

        if (Object.keys(whereCondition).length > 0) {
            const foundFoods = await Food.findAll({ where: whereCondition });
            res.json(foundFoods);
        } else {
            res.status(400).json({ error: 'Parâmetros inválidos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alimentos' });
    }
}

