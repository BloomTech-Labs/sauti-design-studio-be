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
    /* If we have time to set this up
    tbl
      .integer('category')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE'); */
    tbl
      .integer('client_id')
      .unsigned()
      .references('id')
      .inTable('clients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('workflows');
};
