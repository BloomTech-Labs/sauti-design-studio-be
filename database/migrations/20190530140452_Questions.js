exports.up = function(knex, Promise) {
  return knex.schema.createTable("questions", tbl => {
    tbl.increments();
    tbl.string("options", 60).notNullable();
    tbl.string("question_text", 120).notNullable();
    tbl
      .integer("option_number")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("answers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("questions");
};
