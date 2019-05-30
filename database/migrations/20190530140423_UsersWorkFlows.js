exports.up = function(knex, Promise) {
  return knex.schema.createTable("UsersWorkFlows", tbl => {
    tbl
      .integer("User_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("Workflow_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("WorkFlows")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("UsersWorkFlows");
};
