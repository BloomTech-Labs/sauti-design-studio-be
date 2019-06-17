exports.up = function (knex, Promise) {
  return knex.schema.createTable('answers', tbl => {
    tbl.increments();
    tbl.string('answer_text', 128).notNullable();

    tbl.integer('answer_number').unsigned();

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
  return knex.schema.dropTableIfExists('answers');
};
