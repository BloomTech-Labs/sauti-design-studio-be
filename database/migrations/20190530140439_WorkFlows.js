exports.up = function(knex, Promise) {
  return knex.schema.createTable("WorkFlows", tbl => {
    tbl.increments();
    tbl
      .integer("User_id")
      .unsigned()
      .notNullable();

    tbl
      .string("Name", 128)
      .notNullable()
      .unique();

    tbl
      .string("AreaCode", 128)
      .notNullable()
      .unique();

    tbl.string("Category").notNullable();

    tbl
      .integer("Client_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Client")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("Questions")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Questions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {

    return knex.schema
    .dropTableIfExists("WorkFlows")
};
