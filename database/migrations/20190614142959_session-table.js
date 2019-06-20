exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.increments();
    tbl.string('session_id').unsigned();
    tbl.string('phone_num');
    tbl.string('service_code');
    tbl.string('text');
    tbl
      .integer('workflow_id')
      .references('id')
      .inTable('workflows');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
