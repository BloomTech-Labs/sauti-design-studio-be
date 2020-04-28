exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects').then(() =>
    knex.schema
      // PROJECTS TABLE
      .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('project_title', 128);
        tbl.string('initial_node_id');
        tbl.json('graph_json');
        tbl
          .integer('user_id')
          // .unsigned()
          // .notNullable()
          // .references('id')
          // .inTable('users');


      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
