exports.up = function(knex, Promise) {
  return knex.schema.createTable('workflow_questions', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('workflow_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('workflows')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('question_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('workflow_questions');
};
