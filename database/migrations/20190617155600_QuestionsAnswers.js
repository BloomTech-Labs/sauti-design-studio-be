exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions_answers', tbl => {
    tbl.increments();

    tbl
      .integer('workflow_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('workflows')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('answer_id')
      .unsigned()
      .references('id')
      .inTable('answers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('question_id')
      .unsigned()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions_answers');
};
