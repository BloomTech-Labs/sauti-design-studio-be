exports.up = function (knex, Promise) {
  return knex.schema.createTable("workflows", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    tbl
      .string("name", 128)
      .notNullable()
      .unique();

    tbl
      .string("area_code", 128)
      .notNullable()
      .unique();

    tbl.string("category").notNullable();

    tbl
      .integer("client_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("clients")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("question_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("workflows");
};
