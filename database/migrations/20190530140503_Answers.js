exports.up = function(knex, Promise) {
  return knex.schema.createTable("Answers", tbl => {
    tbl.increments();
    tbl.string("AnswerText", 128).notNullable();

    tbl
      .integer("AnswerNumber")
      .unsigned()
      .notNullable()
      
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("Answers");
};
