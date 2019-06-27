exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users').then(() =>
    knex.schema
      // USERS TABLE
      .createTable('users', tbl => {
        tbl.increments();
        tbl.string('company_name', 128);
        tbl.string('country', 128);
        tbl.string('display_name', 158);
        tbl.string('email', 128).notNullable();
        tbl.string('phone_num', 128);
        tbl.string('pic', 128);
        tbl.string('password', 16);
        tbl.string('google_id', 255);
        tbl.string('facebook_id', 255);
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
