import { Request, Response } from "express";
import { Food } from "../models/Foods";
import { Op } from "sequelize";
import { Ingredients } from "../models/ingredients";
const fs = require('fs');
import * as path from "path";




export const All = async (req: Request, res: Response) => {
    try {
        const foods = await Food.findAll();

        const uploadPath = path.join(__dirname, '../uploads');
        // res.json(foods)

        res.json(foods)

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alimentos' });
    }
}

export const findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const food = await Food.findByPk(id, {
            include: Ingredients,
        });

        if (!food) {
            return res.status(404).json({ error: 'Prato não encontrado' });
        }

        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    }
};






export type CardType = {
    id?: number;
    image: string;
    name: string;
    category: string
    description: string;
    ingredients: string[];
    price: number;
}


export const createFood = async (req: Request, res: Response) => {

    try {
        const extension = req.file?.filename.split('.')[1];

        const data = JSON.parse(req.body.data);

        console.log("DADOS::", req.file?.filename, data.name, data.category, data.description, data.ingredients, data.price)
        console.log("req.body:", req.body)
        console.log("Req.body.data", req.body.data)
        console.log("file====>", req.file)
        console.log("DATA:", data)

        const uploadPath = path.join(__dirname, '../uploads')
        const newFileName = `${data.name}.${extension}`


        await fs.renameSync(req.file?.path as string, path.join(uploadPath, newFileName));

        if (!data.name) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando' });
        } else {


            const newFood = await Food.create({ image: newFileName, name: data.name, category: data.category, description: data.description, price: data.price });

            console.log("newFood::", newFood)

            for (const ingredientsName of data.ingredients) {
                await Ingredients.create({ name: ingredientsName, id_food: newFood.id });
            }


            return (res.status(201).json({ message: 'Alimento salvo com sucesso!' })
            );
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar alimento' });
    }
};



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
        const food = await Food.findByPk(id, {
            include: Ingredients,
        });

        if (!food) {
            return res.status(404).json({ error: 'Alimento não encontrado' });
        }

        const extension = req.file?.filename.split('.')[1];
        const data = JSON.parse(req.body?.data || '{}');

        const uploadPath = path.join(__dirname, '../uploads');
        const newFileName = `${data.name}.${extension}`;

        await fs.renameSync(req.file?.path as string, path.join(uploadPath, newFileName));

        if (req.file) {
            food.image = newFileName;
        }
        if (data.name) {
            food.name = data.name;
        }
        if (data.category) {
            food.category = data.category;
        }
        if (data.description) {
            food.description = data.description;
        }
        if (data.price) {
            food.price = data.price;
        }
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
        console.log("DADOS::", req.file?.filename, data.name, data.category, data.description, data.ingredients, data.price)
        console.log("req.body:", req.body)
        console.log("Req.body.data", req.body.data)
        console.log("DATA:", data)
        console.log("terminálogo", data.ingredients)
     
       
        await Ingredients.destroy({
            where: {
                id_food: food.id,
            },
        });


        if (Array.isArray(data.ingredients)) {
            for (const ingredientName of data.ingredients) {
                console.log("LISTA DE INGREDIENTS:", data.ingredients);
                await Ingredients.create({ name: ingredientName, id_food: food.id });
                console.log("ingredients ================>", ingredientName);
            }
            
        } else {
            console.error("Data.ingredients não é um array:", data.ingredients);
        }
        
        await food.save();

        res.status(200).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar alimento' });
    }
}; 



export const findByNameOrIngredients = async (req: Request, res: Response) => {
    const { name, ingredients } = req.query as { [key: string]: string | undefined };


    const whereCondition = await Ingredients.findAll({

        include: {
            model: Food,
            required: true,
            where: {

                "name": {
                    [Op.like]: `%${ingredients}%`
                }
            }

        }
        , where: {


            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${ingredients}%`
                    }
                },


            ]

        }
    })
    console.log("WHERECONDITION: ", whereCondition);
    res.json(whereCondition);

    /* 
        try {
            const whereCondition: Record<string, any> = {};
    
            if (name) {
                whereCondition['name'] = { [Op.like]: `%${name}%` };
            }
    
            if (ingredients) {
                whereCondition['ingredients'] = { [Op.like]: `%${ingredients}%` };
                console.log("WERECONDITION", whereCondition)
            }
    
            if (Object.keys(whereCondition).length > 0) {
                const foundFoods = await Food.findAll({ where: whereCondition });
                res.json(foundFoods);
            } else {
                res.status(400).json({ error: 'Parâmetros inválidos' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar alimentos' });
        } */
}

