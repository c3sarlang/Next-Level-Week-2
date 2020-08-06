import {Request,Response} from "express"
import db from "../database/connection"

export default class connectionsController {
    async index (request: Request, response:Response){

        const totalConnections = await db("connections").count("* as total") //pegando todos os registros e contando.

        const { total } = totalConnections[0] //retornando um array com a quantidade total

        return response.json({total})
    }


    
    async create (request: Request, response:Response){
        const {user_id} = request.body; //pegando id do usuario

        await db ("connections").insert({ //pegando quantidade de ids.
            user_id
        })

        return response.status(201).send();
    }

}