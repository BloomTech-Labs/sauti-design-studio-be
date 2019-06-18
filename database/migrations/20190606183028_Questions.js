exports.up = function (knex, Promise) {
  return knex.schema.createTable('questions', tbl => {
    tbl.increments();
    tbl.string('question_text', 120).notNullable();
    tbl.integer('order')
    tbl
      .integer('question_id')
      .unsigned()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('questions');
};
