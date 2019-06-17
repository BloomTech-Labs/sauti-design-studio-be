exports.up = function(knex, Promise) {
  return knex.schema.createTable('client_response', tbl => {
    tbl.increments();
    tbl
      .integer('question_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('answer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('answers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.string('response_text', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('client_response');
};
