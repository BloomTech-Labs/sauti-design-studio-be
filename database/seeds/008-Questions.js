exports.seed = function(knex, Promise) {
  
      // Inserts seed entries
      return knex("questions").insert([
        {
          options: "Test",
          question_text: "would you like to..",
          option_number: 1
        },
        {
          options: "Option 2",
          question_text: "Selected Option 2",
          option_number: 2
        },
        {
          options: "Option 3",
          question_text: "Selected Option 3",
          option_number: 3
        }
      ]);
    }
