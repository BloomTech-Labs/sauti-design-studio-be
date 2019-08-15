
exports.up = function(knex, Promise) {
    return knex.schema.dropTableIfExists('nodes').then(() =>   
    knex.schema.createTable('nodes', table => {
        table.increments();
        
        table.string('node_id', 256).notNullable();

        table.string('text', 256).notNullable();
        table.specificType('options', 'text ARRAY');
        table.specificType('Cons', 'text ARRAY');
        table
          .integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects');
         table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users');
        
        table.string('previous');
    })
    );
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('nodes');
};
