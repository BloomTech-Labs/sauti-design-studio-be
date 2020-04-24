exports.up = function(knex, Promise) {
  return knex.schema.raw('drop table if exists projects cascade').then(() =>
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

        // tbl
        //   .integer('graph_id')
        //   .unsigned()
        //   .notNullable()
        //   .references('id')
        //   .inTable('???????')
        //   .onDelete('CASCADE')
        //   .onUpdate('CASCADE');
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
