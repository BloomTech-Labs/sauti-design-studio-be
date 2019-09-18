exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', tbl => {
    tbl.increments();
    
    tbl.string('session_id').unsigned();
    tbl.string('phone_num');
    tbl.string('service_code');
    tbl.string('text');
    tbl.string('workflow');
      
    tbl.string('page');

    tbl.specificType('history', 'text ARRAY');

    tbl.timestamps(true, true);

    // tbl.string('created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
