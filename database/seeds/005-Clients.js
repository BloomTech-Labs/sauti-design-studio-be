exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('clients').insert([
    // { phone_num: '214-123-456', isActive: true, workflow_id: 1 },
    // { phone_num: '214-123-456', isActive: false, workflow_id: 2 },
    // { phone_num: '214-123-456', isActive: false, workflow_id: 3 },
  ]);
};
