exports.seed = function(knex, Promise) {
// Inserts seed entries
    return knex('projects').insert([
        {
        project_title: 'Title 1',
        graph_json: null,
        user_id: 1,
        }
    ]);
};