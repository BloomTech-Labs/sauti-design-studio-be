exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('workflows').insert([
    {
      id: 1,
      user_id: 1,
      name: 'yes',
      area_code: '#321!',
      category: 'Food',
      client_id: 1,
      question_id: 1
    },
    {
      id:2,
      user_id: 2,
      name: "Sauti Supplies",
      area_code: "#421!",
      category: "Supplies",
      client_id: 2,
      question_id: 2
    },
    {
      id:3,
      user_id: 3,
      name: "Sauti Vehicles",
      area_code: "#521!",
      category: "Vehicles",
      client_id: 3,
      question_id: 3
    }
  ]);
};
