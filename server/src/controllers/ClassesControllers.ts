import {Request,Response} from "express" //tipando linguagem para typescript
import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";


interface ScheduledItem { //define um formato de um objeto
    week_day: number
    from: string;
    to: string;
}


export default class ClassesController {


    async index (request: Request, response:Response){ //listando aulas
        const filters = request.query //filtros

        const subject = filters.subject as string; //dizendo que a conversao resulta uma string para corrigir erro.
        const week_day = filters.week_day as string;
        const time = filters.time as string;




        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: "Não possui filtros para buscar as aulas"
            })
        }

        const timeInMinutes = convertHourToMinutes(time) 

        const classes = await db("classes")
        .whereExists(function(){ //aonde existe
            this.select("class_schedule.*") //na tabela class_schedule
            .from("class_schedule")
            .whereRaw("`class_schedule`.`class_id` = `classes`.`id`") //aonde o id do usuario referencia as aulas relacionados a ele.
            .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)]) //aonde o usuario atende na semana.
            .whereRaw("`class_schedule`.`from` <= ??",[timeInMinutes]) // aonde entre os horários que o usuario atende.
            .whereRaw("`class_schedule`.`to` >= ??",[timeInMinutes])// aonde entre os horários que o usuario nao atende.
        })
        .where("classes.subject", "=", (subject))//procurando as aulas relacionados aos assuntos.
        .join("users", "classes.user_id", "=", "users.id") //puxando dados do perfil dos usuarios relacionados a quem da as aulas.
        .select(["classes.*", "users.*"]) //selecionando e puxando usuarios


    
        return response.json(classes);

    }






    async create (request: Request,response: Response){
        const { //desestruturaçao
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
    
        const trx = await db.transaction(); //se der um insert do cadastro desfaz todos.
    
        try{ //tente fazer
            
        const insertedUsersIds = await trx("users").insert({ //inserindo dados na tabela users
            name,
            avatar,
            whatsapp,
            bio,
        }) //esperando acesso a tabela de inserçao de dados
    
        const user_id =  insertedUsersIds[0]; //pegando user_id
    
        const insertedClassesIds= await trx("classes").insert({ //inserindo dados na tabela classes
            subject,
            cost,
            user_id
        })
    
        const class_id = insertedClassesIds[0] //pegando class_id
    
        const classSchedule = schedule.map((scheduleItem:ScheduledItem) => { //percorrendo dados e transformando num objeto
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
                
            }
        })
    
        await trx("class_schedule").insert(classSchedule)
    
        await trx.commit();
    
        return response.status(201).json({ //sucesso
            sucess: "Sucesso ao criar uma nova classe!"
        }) 
    
         //insere tudo ao mesmo tempo no banco de dados.
    
        }catch(err){ //caso aconteça um erro.
    
            await trx.rollback();//desfazendo qualquer alteraçao que ocorrer
    
            return response.status(400).json({ //error
                error: "Error ao criar uma nova classe!"
            })
    
        }
    }
}