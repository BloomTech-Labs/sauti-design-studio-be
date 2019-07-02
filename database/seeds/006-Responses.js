exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('responses').insert([
    // Workflow: Melee
    { title: 'Top Tier', workflow: 1, index: 1 },
    { title: 'Low Tier', workflow: 1, index: 2 },
    // Workflow: Tools
    { title: 'Good For Smashing', workflow: 2, index: 1 },
    { title: 'Good For Cutting', workflow: 2, index: 2 },
    // Top Tier
    { title: 'Fox', parent: 1, workflow: 1, index: 1 },
    { title: 'Falco', parent: 1, workflow: 1, index: 2 },
    { title: 'Jiggly Puff', parent: 1, workflow: 1, index: 3 },
    { title: 'Captain Falcon', parent: 1, workflow: 1, index: 4 },
    { title: 'Sheik', parent: 1, workflow: 1, index: 5 },
    // Low Tier
    { title: 'Bowser', parent: 1, workflow: 1, index: 1 },
    { title: 'Pichu', parent: 2, workflow: 1, index: 2 },
    { title: 'Yoshi', parent: 2, workflow: 1, index: 3 },
    { title: 'Roy', parent: 2, workflow: 1, index: 4 },
    { title: 'Donkey Kong', parent: 2, workflow: 1, index: 5 },
    // Good for smashing
    { title: 'Hammer', parent: 3, workflow: 2, index: 1 },
    // Good for Cutting
    { title: 'Scissors', parent: 4, workflow: 2, index: 1 },
    { title: 'Saw', parent: 4, workflow: 2, index: 2 },
    { title: 'Knife', parent: 4, workflow: 2, index: 3 },
    { title: 'Strengths', parent: 5, workflow: 1, index: 1 },
    { title: 'Weaknesses', parent: 5, workflow: 1, index: 1 },
    // Strengths
    { title: 'Speed', parent: 19, workflow: 1, index: 1 },
    { title: 'Recovery', parent: 19, workflow: 1, index: 2 },
    { title: 'Shine Spike', parent: 19, workflow: 1, index: 3 },
    // Weaknesses
    { title: 'Technical', parent: 20, workflow: 1, index: 1 },
    { title: 'Not beginner friendly', parent: 19, workflow: 1, index: 2 },
    { title: 'Well known matchup', parent: 19, workflow: 1, index: 3 },
  ]);
};
