exports.seed = function(knex, Promise) {
  
      // Inserts seed entries
      return knex("questions").insert([
        {
          options: "Test",
          question_text: "would you like to..",
          option_number: 1
        }
      ]);
    }
