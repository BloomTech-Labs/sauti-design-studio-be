
exports.up = function(knex, Promise) {
  return (
      knex.schema
      
      .createTable("Client", tbl => {

        tbl.increments()
        tbl.boolean("isActive").defaultTo(false)
        tbl.integer('WorkFlow_id').notNullable().unsigned()
      })
  )
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists("Client")
};
