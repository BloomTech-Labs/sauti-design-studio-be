exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.increments();
    tbl.string('session_id').unsigned();
    tbl.string('phone_num');
    tbl.string('service_code');
    tbl.string('text');
    tbl
      .integer('workflow')
      .references('id')
      .inTable('workflows');
    tbl.integer('response');
    tbl
      .integer('owner')
      .references('id')
      .inTable('responses');

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
