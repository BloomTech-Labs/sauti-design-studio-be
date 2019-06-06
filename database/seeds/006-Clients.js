
exports.seed = function(knex, Promise) {
  
      // Inserts seed entries
      return knex('clients').insert([
        {isActive: false,workflow_id: 1}
      ]);
    }
