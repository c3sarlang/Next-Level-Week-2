import path from "path"

//mostrando caminho para ser usado pelo knex

module.exports = {
    client: "sqlite3", //definindo o tipo de banco
    connection: { //banco de dados
        filename: path.resolve(__dirname,"src", "database", "database.sqlite")  //botanto dentro da pasta database um arquivo com o nome database.sqlite
    },

    migrations : { //definicao do banco de dados.
        directory: path.resolve (__dirname,"src", "database", "migrations")
    },

    useNullAsDefault: true,
}