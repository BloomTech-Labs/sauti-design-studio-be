exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('categories').insert([
    {
      user_id: 1,
      text: 'Fun',
    },
    {
      user_id: 1,
      text: 'Info',
    },
  ]);
};
