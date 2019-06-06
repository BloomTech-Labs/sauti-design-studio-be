exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users_workflows").insert([{ user_id: 1, workflow_id: 1 }]);
};
