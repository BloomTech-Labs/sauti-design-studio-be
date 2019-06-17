
exports.up = function(knex, Promise) {
  return knex.schema.createTable('client_response', tbl => {
      tbl.increments();
      tbl
      .integer('response_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('questions','answers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('client_response');
};
