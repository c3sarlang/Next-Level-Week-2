import knex from "knex";
import path from "path" //mostra exatamanete aonde fica o arquivo

//migrations controla a versao do banco de dados.

const db = knex({ //criando banco de dados
    client: "sqlite3", //definindo o banco de dados.
    connection: {
        filename: path.resolve(__dirname,"database.sqlite")  //botanto dentro da pasta database um arquivo com o nome database.sqlite
    },
    useNullAsDefault: true, //usando como padrao a resposta nula se nao possuir nada.
});

export default db;