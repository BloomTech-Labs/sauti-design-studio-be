exports.up = function(knex, Promise) {
  return knex.schema.createTable("Questions", tbl => {
    tbl.increments();
    tbl.string("Options", 60).notNullable();
    tbl.string("QuestionText", 120).notNullable();
    tbl
      .integer("OptionNumber")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Answers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("Questions");
};
