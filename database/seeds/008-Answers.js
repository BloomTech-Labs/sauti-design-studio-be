exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('answers').insert([
    { answer_text: 'You are cool', answer_number: 1, question_id: 1 },
    { answer_text: 'You are not cool', answer_number: 2, question_id: 1 },
    { answer_text: 'You might be cool', answer_number: 3, question_id: 3 },
  ]);
};
