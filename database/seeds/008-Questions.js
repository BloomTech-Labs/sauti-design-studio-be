exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('questions').insert([
    {
      question_text: 'would you like to..',
      option_number: 1,
    },
    {
      question_text: 'Selected Option 2',
      option_number: 2,
    },
    {
      question_text: 'Selected Option 3',
      option_number: 3,
    },
  ]);
};
