
exports.up = function(knex, Promise) {
    return knex.schema.createTable('graphTable', table => {
        table.increments();
        
        table.string('name', 256).notNullable();

        table.string('text', 256).notNullable();

        table.string('Con1');
        table.string('Con2');
        table.string('Con3');

        table.string('previous');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('graphTable');
};