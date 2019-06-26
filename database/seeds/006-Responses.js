exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('responses').insert([
    { text: 'Top Tier', owner: null, workflow: 1, index: 1 },
    { text: 'Low Tier', owner: null, workflow: 1, index: 2 },
    { text: 'Good For Smashing', owner: null, workflow: 2, index: 1 },
    { text: 'Good For Cutting', owner: null, workflow: 2, index: 2 },
    // Top Tier
    { text: 'Fox', owner: 1, workflow: 1, index: 1 },
    { text: 'Falco', owner: 1, workflow: 1, index: 2 },
    { text: 'Jiggly Puff', owner: 1, workflow: 1, index: 3 },
    { text: 'Captain Falcon', owner: 1, workflow: 1, index: 4 },
    { text: 'Sheik', owner: 1, workflow: 1, index: 5 },
    // Low Tier
    { text: 'Bowser', owner: 1, workflow: 1, index: 1 },
    { text: 'Pichu', owner: 2, workflow: 1, index: 2 },
    { text: 'Yoshi', owner: 2, workflow: 1, index: 3 },
    { text: 'Roy', owner: 2, workflow: 1, index: 4 },
    { text: 'Donkey Kong', owner: 2, workflow: 1, index: 5 },
    // Good for smashing
    { text: 'Hammer', owner: 3, workflow: 1, index: 1 },
    // Good for Cutting
    { text: 'Scissors', owner: 4, workflow: 1, index: 1 },
    { text: 'Saw', owner: 4, workflow: 1, index: 2 },
    { text: 'Knife', owner: 4, workflow: 1, index: 3 },
  ]);
};
