exports.up = function(knex, Promise) {
  return (
    knex.schema

      // USERS TABLE
      .createTable("users", users => {
        users.increments();
        users.string("company_name", 128);
        users.string("country", 128);
        users.string("display_name", 158);
        users.string("email", 128).notNullable();
        users.string("phone_num", 128);
        users.string("password", 16);
        users.integer("google_id");
        users.integer("facebook_id");
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
