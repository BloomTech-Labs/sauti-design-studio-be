const db = require('../database/dbConfig');

module.exports = {
  find,
  insert,
};

function find(filter) {
  return db('graphTable').where(filter);
}

function insert(rowData) {
    console.log('TCL: add -> workflow', rowData);
    return db('graphTable')
        .insert(rowData)
        .then((id) => {
            console.log('name ', rowData.name);
            db('graphTable').where({ name: rowData.name })
        })
        .catch(err => console.error(err));
}

// db('analyses').insert({
//     userid: data.id,
//     choice: data.choice,
//     Label:  data.labelG,
//     Results: data.resultG,
//     description: data.description
// }) 