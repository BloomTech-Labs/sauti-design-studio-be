const db = require('../database/dbConfig');
const Promise = require('bluebird');
/* Example of object
{ id: 1, title: 'example', parent: null, workflow: 1, index: 1 } */
const makeTree = items => {
  let familyTree = [];
  const parents = items.filter(item => !item.parent);

  parents.forEach((parent, i) => {
    let children = items.filter(child => child.parent === parent.id);

    const findChildren = array =>
      array.forEach(child => {
        let temp = items.filter(item => item.parent === child.id);
        if (temp.length > 0) {
          findChildren(temp);
          child.children = temp;
        }
        return child;
      });

    findChildren(children);

    familyTree[i] = { ...parent, children };
  });

  familyTree.map(obj => {
    if (obj.children.length === 0) {
      delete obj.children;
    }
    return obj;
  });

  return familyTree;
};

const getIndex = async ({ parent: filter, workflow }) => {
  let parent = filter;
  if (!parent) parent = null;
  const { count: index } = await db('responses')
    .where({ parent, workflow })
    .count()
    .first()
    .catch(err => err);
  return index;
};

const tree = async filter => makeTree(await db('responses').where(filter));

const find = filter => db('responses').where(filter);

const getById = ({ id, workflow }) =>
  db('responses')
    .where({ id, workflow })
    .distinct()
    .first();

// Add new value
const add = async ({ title, parent, workflow }) => {
  getIndex({ parent, workflow }).then(index => {
    console.log('TCL: count', index);
    return db('responses')
      .insert({ title, parent, workflow, index })
      .returning('id')
      .then(([id]) => getById(id));
  });
};

const update = values =>
  db('responses')
    .where({ id: values.id })
    .update(values)
    .returning('id')
    .then(([id]) => getById(id));

const save = values =>
  db('responses')
    .where({ id: values.id })
    .update(values);

const remove = async id => {
  const [workflow] = await db('responses')
    .select('workflow')
    .where({ id });

  const items = await db('responses')
    .where({ id })
    .del()
    .then(() => tree(workflow));

  return items;
};

module.exports = {
  find,
  tree,
  getById,
  add,
  update,
  remove,
  save,
};
