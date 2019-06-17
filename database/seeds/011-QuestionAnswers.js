exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('questions_answers').insert([
    {
      workflow_id: 1,
      answer_id: 1,
      question_id: 1,
    },
    {
      workflow_id: 1,
      answer_id: 2,
      question_id: 2,
    },
  ]);
};
