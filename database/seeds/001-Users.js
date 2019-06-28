exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('users').insert([
    {
      company_name: 'Sauti Studio Designs',
      country: 'USA',
      display_name: 'Sauti Studio',
      email: 'sauti.design.studio@gmail.com',
      phone_num: '235556969',
      pic: 'https://avatars0.githubusercontent.com/u/51124353?s=200&v=4',
      password: null,
      google_id: '103512929668160621184',
      facebook_id: null,
    },
  ]);
};
