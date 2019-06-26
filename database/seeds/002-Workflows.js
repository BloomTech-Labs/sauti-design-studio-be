exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('workflows').insert([
    {
      user_id: 1,
      name: 'Melee',
    },
    {
      user_id: 1,
      name: 'Tools',
    },
  ]);
};
