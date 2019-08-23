const db = require('../database/dbConfig');

module.exports = {
	find,
    insert,
    getNode
};

function find(filter) {
	return db('nodes').where(filter);
}

function getNode(node_id){
    console.log(node_id)
    return db('nodes').where({node_id}).catch(error => error.message);
}

async function insert(rowData) {
	const { node_id } = rowData;
    const [alreadyNode] = await db('nodes').where({ node_id });
    
	if (alreadyNode) {
		updatedNode = await db('nodes')
			.where({ node_id })
            .update(rowData);
		return updatedNode;
	}
	
	const inserted = await db('nodes').insert(rowData)

	return inserted

}