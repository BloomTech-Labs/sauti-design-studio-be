exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.increments();
    tbl.integer('session_id').unsigned();
    tbl
      .integer('workflow_id')
      .references('id')
      .inTable('workflows');
    tbl
      .string('phone_num')
      .references('question_id')
      .table('workflows');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
