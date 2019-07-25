
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('graphTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('graphTable').insert([
        {
          name: '64e80533',
          text: 'blah blah 1',

          Con1: '8d8ba75a',
          Con2: '0bO43e36',
          Con3: '',

          previous: '',
        },

        {
          name: '8d8ba75a',
          text: 'blah blah 2',

          Con1: 'cyclops',
          Con2: 'jean',
          Con3: '',

          previous: '64e80533',
        },

        {
          name: '0bO43e36',
          text: 'blah blah 3',

          Con1: 'beast',
          Con2: 'angel',
          Con3: '',

          previous: '64e80533',
        },

        {
          name: 'cyclops',
          text: 'blah blah 4',

          Con1: '',
          Con2: '',
          Con3: '',

          previous: '8d8ba75a',
        },

        {
          name: 'jean',
          text: 'blah blah 5',

          Con1: '',
          Con2: '',
          Con3: '',

          previous: '8d8ba75a',
        },

        {
          name: 'beast',
          text: 'blah blah 6',

          Con1: '',
          Con2: '',
          Con3: '',

          previous: '0bO43e36',
        },

        {
          name: 'angel',
          text: 'blah blah 7',

          Con1: '',
          Con2: '',
          Con3: '',

          previous: '0bO43e36',
        },
        
      ]);
    });
};
