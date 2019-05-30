exports.up = function(knex, Promise) {
  return (
    knex.schema

      // USERS TABLE
      .createTable("Users", users => {
        users.increments();
        users.string("CompanyName", 128).notNullable();
        users.string("Country", 128).notNullable();
        users.string("Email", 128).notNullable();
        users.string("PhoneNum", 128).notNullable();
        users.string("Password", 16).notNullable();
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("Users");
};
