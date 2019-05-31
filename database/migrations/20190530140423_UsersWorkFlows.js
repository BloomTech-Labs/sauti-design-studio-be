exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_workflows", tbl => {
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("workflow_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("workFlows")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users_workflows");
};
