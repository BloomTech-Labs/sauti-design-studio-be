exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("workflows").insert([
    {
      id:1,
      user_id: 1,
      name: "yes",
      area_code: "#321!",
      category: "Food",
      client_id: 1,
      question_id: 1
    }
  ]);
};
