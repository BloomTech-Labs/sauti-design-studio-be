
exports.up = function(knex, Promise) {
  return (
      knex.schema
      
      .createTable("Client", tbl => {

        tbl.increments()
        tbl.integer().notNullable().unsigned()
        tbl.boolean("isActive").defaultTo(false)
        tbl.integer('WorkFlow_id').notNullable().unsigned()
      })
  )
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists("Client")
};
