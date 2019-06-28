exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('workflows').insert([
    {
      user_id: 1,
      name: 'All Things Melee',
      category: 1,
    },
    {
      user_id: 1,
      name: 'All Things Tooly',
      category: 2,
    },
  ]);
};
