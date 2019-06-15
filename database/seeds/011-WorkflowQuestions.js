exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('workflow_questions').insert([
    {
      user_id: 1,
      workflow_id: 1,
      question_id: 1,
    },
    {
      user_id: 1,
      workflow_id: 1,
      question_id: 2,
    },
  ]);
};
