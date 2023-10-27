import { Request, Response } from "express";
import { Order } from "../models/Oders";

export const All =async (req:Request, res:Response) => {
    const order= await Order.findAll()

    res.json(order)
}
export const createOrders = async(req:Request, res:Response) => {
    const {FoodId, UserId } = req.body;

    if(req.body.FoodId && req.body.UserId){
        
    }
}