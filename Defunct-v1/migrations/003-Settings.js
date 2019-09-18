exports.up = function(knex, Promise) {
  return knex.schema.createTable('settings', tbl => {
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.boolean('expanded').defaultTo(false);
    tbl.boolean('expandParent').defaultTo(true);
    tbl.boolean('addAsFirstChild').defaultTo(false);
    tbl.boolean('keepSidebarOpen').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('settings');
};
