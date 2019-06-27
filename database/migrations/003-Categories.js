exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments();

    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.string('text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
