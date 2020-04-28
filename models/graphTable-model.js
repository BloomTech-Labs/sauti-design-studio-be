const db = require('../database/dbConfig');

module.exports = {
	find,
	insert
};

function find(filter) {
	return db('graphTable').where(filter);
}

async function insert(rowData) {
	const { name } = rowData;
	const [alreadyNode] = await db('graphTable').where({ name });

	if (alreadyNode) {
		updatedNode = await db('graphTable')
			.where({ name })
      .update(rowData);
		return updatedNode;
	}

	console.log('TCL: add -> graphTable Data Row ', rowData);
	return db('graphTable')
		.insert(rowData)
		.then(id => {
			console.log('name ', rowData.name);
			db('graphTable').where({ name: rowData.name });
		})
		.catch(err => console.error(err));
}


