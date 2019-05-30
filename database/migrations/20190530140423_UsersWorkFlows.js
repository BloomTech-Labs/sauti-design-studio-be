
exports.up = function(knex, Promise) {
  return (
      knex.schema
        .createTable("UsersWorkFlows", tbl => {
            tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("Users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

            tbl.integer('workflow_id')
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("WorkFlows")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        })
  )
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('UsersWorkFlows')
};
