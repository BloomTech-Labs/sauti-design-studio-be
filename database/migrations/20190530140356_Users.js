exports.up = function(knex, Promise) {
  return (
    knex.schema

      // USERS TABLE
      .createTable("Users", Users => {
        Users.increments();
        Users.string("CompanyName", 128).notNullable();
        Users.string("Country", 128).notNullable();
        Users.string("Email", 128).notNullable();
        Users.string("PhoneNum", 128).notNullable();
        Users.string("Password", 16).notNullable();
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("Users");
};
