exports.up = function(knex, Promise) {
  return knex.schema.createTable('workflows', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('name', 128).notNullable();
    tbl.string('service_code');
    tbl.string('category');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('workflows');
};
