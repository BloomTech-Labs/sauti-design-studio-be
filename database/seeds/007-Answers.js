exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("answers").insert([
    { answer_text: "1", answer_number: 1 },
    { answer_text: "2", answer_number: 2 },
    { answer_text: "3", answer_number: 3 }
  ]);
};
