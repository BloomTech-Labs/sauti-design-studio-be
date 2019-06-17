exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('questions').insert([
    {
      question_text: 'would you like to..',
    },
    {
      question_text: 'Selected Option 2',
    },
    {
      question_text: 'Selected Option 3',
    },
  ]);
};
