import { Request, Response } from "express";
import { User } from "../models/Users";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';

export const All =async (req:Request, res:Response) => {
    const users = await User.findAll()

    res.json(users)
    
}
export const createUser = async (req: Request, res: Response) => {
    let { name, email, password } = req.body;

    if (req.body.name && req.body.email && req.body.password) {

        let hashUser = await User.findOne({ where: { email } });

        console.log('dados pegos, email encontrado:', email);

        if (!hashUser) {

            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = await User.create({ name, email, password:hashedPassword });
            res.json({ newUser });
        } else {
            res.json({ error: 'E-mail já existe' });
        }
    } else {

        res.json({ error: 'deu um errinho' });
    }
}
export const login = async(req:Request, res:Response) => {
    if(req.body.email && req.body.password) {
        let email:string = req.body.email;
        let password:string = req.body.password;
        console.log("email:", email)
        console.log("password", password)

        let user = await User.findOne({
            where: {email}
        });
      const acept = await bcrypt.compare(password, user?.password as string)
        if(user && acept){
            
            const token = JWT.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                {expiresIn: '1h'}
            );
            let newUser ={
                id: user.id,
                nome: user.name,
                email: user.email
            }
            res.json({status: true, token, user:newUser})

            return
        }
        res.status(400).json({status:false})
    }else{

    }
}
export const deletUser = async (req:Request, res:Response) => {
    const id = req.params.id

    try{
        const user = await User.findByPk(id);
        if(user){
            await user.destroy()
            res.status(204).send()
        }else{
            res.status(404).json({error: 'User não encontrado'})
        }
    }catch(error){
        res.status(500).json({error: 'Erro ao excluir user'})
    }
}