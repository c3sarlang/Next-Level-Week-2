import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express(); //unsando a funcao com express

app.use(cors());
app.use (express.json()); //converte o request body para json.
app.use(routes);




// app.get("/", (request,response) => { //funcao que usa uma rota. (request,response:pedido,reposta)
//     return response.json({message: "Hello World"})
//     // return response.send("Hello Rola")
// })

// localhost:3333/users

app.listen(3333); //escutando a uma porta.