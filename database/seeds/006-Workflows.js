exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  // Inserts seed entries
  // SEED WORKFLOW TABKE WITH DATA SO I CAN PULL FROM
  return knex("workflows").insert([
    {
      user_id: 1,
      name: "yes",
      area_code: "#123!",
      Category: "Food",
      client_id: 1,
      questions: "Select one of the options"
    },
    {
      user_id: 1,
      name: "yes",
      area_code: "#123!",
      Category: "Food",
      client_id: 1,
      questions: "Select one of the options"
    },
    {
      user_id: 1,
      name: "yes",
      area_code: "#123!",
      Category: "Food",
      client_id: 1,
      questions: "Select one of the options"
    },
    {
      user_id: 1,
      name: "yes",
      area_code: "#123!",
      Category: "Food",
      client_id: 1,
      questions: "Select one of the optio"
    }
  ]);
};
