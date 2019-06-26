exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('responses').insert([
    {
      text: 'Top Tier',
      owner: null,
      workflow: 1,
      index: 1,
    },
    {
      text: 'Low Tier',
      owner: null,
      workflow: 1,
      index: 2,
    },
    {
      text: 'Fox',
      owner: 1,
      workflow: 1,
      index: 1,
    },
    {
      text: 'Marth',
      owner: 1,
      workflow: 1,
      index: 2,
    },
  ]);
};
