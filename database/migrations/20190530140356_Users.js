exports.up = function(knex, Promise) {
  return (
    knex.schema

      // USERS TABLE
      .createTable("users", users => {
        users.increments();
        users.string("company_name", 128).notNullable();
        users.string("country", 128).notNullable();
        users.string("email", 128).notNullable();
        users.string("phone_num", 128).notNullable();
        users.string("password", 16).notNullable();
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
