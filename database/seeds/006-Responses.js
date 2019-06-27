exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('responses').insert([
    // Workflow: Melee
    { text: 'Top Tier', workflow: 1, index: 1 },
    { text: 'Low Tier', workflow: 1, index: 2 },
    // Workflow: Tools
    { text: 'Good For Smashing', workflow: 2, index: 1 },
    { text: 'Good For Cutting', workflow: 2, index: 2 },
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
    { text: 'Hammer', owner: 3, workflow: 2, index: 1 },
    // Good for Cutting
    { text: 'Scissors', owner: 4, workflow: 2, index: 1 },
    { text: 'Saw', owner: 4, workflow: 2, index: 2 },
    { text: 'Knife', owner: 4, workflow: 2, index: 3 },
    { text: 'Strengths', owner: 5, workflow: 1, index: 1 },
    { text: 'Weaknesses', owner: 5, workflow: 1, index: 1 },
    // Strengths
    { text: 'Speed', owner: 19, workflow: 1, index: 1 },
    { text: 'Recovery', owner: 19, workflow: 1, index: 2 },
    { text: 'Shine Spike', owner: 19, workflow: 1, index: 3 },
    // Weaknesses
    { text: 'Technical', owner: 20, workflow: 1, index: 1 },
    { text: 'Not beginner friendly', owner: 19, workflow: 1, index: 2 },
    { text: 'Well known matchup', owner: 19, workflow: 1, index: 3 },
  ]);
};
