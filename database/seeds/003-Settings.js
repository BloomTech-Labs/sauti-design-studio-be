exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('settings')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('settings').insert([
        {
          user_id: 1,
          expanded: true,
          expandParent: true,
          addAsFirstChild: true,
        },
      ]);
    });
};
