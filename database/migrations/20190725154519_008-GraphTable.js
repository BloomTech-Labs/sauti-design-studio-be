
exports.up = function(knex, Promise) {
    return knex.schema.dropTableIfExists('graphTable').then(() =>   
    knex.schema.createTable('graphTable', table => {
        table.increments();
        
        table.string('name', 256).notNullable();

        table.string('text', 256).notNullable();

        // table.enu('Options', []);
        table.specificType('Options', 'text ARRAY');
        // table.enu('Cons', []);
        table.specificType('Cons', 'text ARRAY');

        table.string('Con1');
        table.string('Con2');
        table.string('Con3');
        table.string('Con4');
        table.string('Con5');
        table.string('Con6');
        table.string('Con7');
        table.string('Con8');
        table.string('Con9');

        table.string('previous');
    })
    );
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('graphTable');
};