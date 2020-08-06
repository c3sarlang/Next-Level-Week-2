import Knex from "knex"

export async function up(knex: Knex) { //quais alteracoes quero fazer no banco de dados.

        return knex.schema.createTable("connections", table =>{ //tabela sendo criada com os devidos campos
            table.increments("id").primary();

            
            table.integer("user_id") //criando relaçao com outra tabela.
            .notNullable()
            .references("id")
            .inTable("users") //tabela users.
            .onDelete("CASCADE") //apagando dados um user relacionado nesta tabela.
            .onUpdate("CASCADE") //altera as tambem nesta tebela.

            table.time("crated_at") //settanto a hora de acesso.
            .defaultTo(knex.raw("CURRENT_TIMESTAMP"))//settanto a hora de acesso.
            .notNullable();

        })
}

export async function down(knex: Knex) { //voltar a uma versao anterior.
    return knex.schema.dropTable("connections");
}