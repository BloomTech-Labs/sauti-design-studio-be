exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.increments();
    
    tbl.string('session_id').unsigned();
    tbl.string('phone_num');
    tbl.string('service_code');
    tbl.string('text');
    tbl.string('workflow');
      
    tbl.string('page');

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
