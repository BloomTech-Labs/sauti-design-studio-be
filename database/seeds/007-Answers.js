exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('answers').insert([{ answer_text: '1', answer_number: 1 }]);
};
