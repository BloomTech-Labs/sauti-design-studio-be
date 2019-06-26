exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('users').insert([
    {
      company_name: 'Bad Ass Company',
      country: 'USA',
      display_name: 'Billy BadAss',
      email: 'billy@billybadass.com',
      phone_num: '235556969',
      pic: 'hi',
      password: null,
      google_id: null,
      facebook_id: null,
    },
  ]);
};
