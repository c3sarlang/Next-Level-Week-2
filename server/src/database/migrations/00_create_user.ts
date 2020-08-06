import Knex from "knex"

export async function up(knex: Knex) { //quais alteracoes quero fazer no banco de dados.

        return knex.schema.createTable("users", table =>{ //tabela sendo criada com os devidos campos
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("avatar").notNullable();
            table.string("whatsapp").notNullable();
            table.string("bio").notNullable();

        })
}

export async function down(knex: Knex) { //voltar a uma versao anterior.
    return knex.schema.dropTable("users");
}