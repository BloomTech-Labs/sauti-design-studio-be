<<<<<<< HEAD

exports.up = function (knex, Promise) {
  return (
    knex.schema

      .createTable("clients", tbl => {

        tbl.increments()
        tbl.string("phone_num", 128);
        tbl.boolean("isActive").defaultTo(false)
        tbl.integer('workflow_id').notNullable().unsigned()
      })
  )
=======
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients', tbl => {
    tbl.increments();
    tbl.boolean('isActive').defaultTo(false);
    tbl
      .integer('workflow_id')
      .notNullable()
      .unsigned();
  });
>>>>>>> master
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('clients');
};
