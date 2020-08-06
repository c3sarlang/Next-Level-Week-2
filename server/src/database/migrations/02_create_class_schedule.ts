import Knex from "knex"

export async function up(knex: Knex) { //quais alteracoes quero fazer no banco de dados.

        return knex.schema.createTable("class_schedule", table =>{ //tabela sendo criada com os devidos campos
            table.increments("id").primary();


            table.integer("week_day").notNullable();
            table.integer("from").notNullable();
            table.integer("to").notNullable();
            
            table.integer("class_id") //criando relaçao com outra tabela.
            .notNullable()
            .references("id")
            .inTable("classes") //tabela classes.
            .onDelete("CASCADE") //apagando dados um user relacionado nesta tabela.
            .onUpdate("CASCADE") //altera as tambem nesta tebela.

        })
}

export async function down(knex: Knex) { //voltar a uma versao anterior.
    return knex.schema.dropTable("class_schedule");
}