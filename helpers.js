const data = [
  { id: 1, title: 'Top Tier', parent: null, index: 1 },
  { id: 2, title: 'Low Tier', parent: null, index: 2 },
  { id: 5, title: 'Fox', parent: 1, index: 1 },
  { id: 6, title: 'Falco', parent: 1, index: 2 },
  { id: 7, title: 'Jiggly Puff', parent: 1, index: 3 },
  { id: 8, title: 'Captain Falcon', parent: 1, index: 4 },
  { id: 9, title: 'Sheik', parent: 1, index: 5 },
  { id: 10, title: 'Bowser', parent: 1, index: 1 },
  { id: 11, title: 'Pichu', parent: 2, index: 2 },
  { id: 12, title: 'Yoshi', parent: 2, index: 3 },
  { id: 13, title: 'Roy', parent: 2, index: 4 },
  { id: 14, title: 'Donkey Kong', parent: 2, index: 5 },
  { id: 15, title: 'Stats', parent: 14, index: 1 },
  { id: 16, title: 'Cool', parent: 5, index: 1 },
];

/*
{ id, title, parent, workflow, index }
*/

const makeTree = items => {
  let familyTree = [];
  const parents = items.filter(item => !item.parent);

  parents.forEach((parent, i) => {
    let children = items.filter(child => child.parent === parent.id);

    const findChildren = array =>
      array.forEach(child => {
        let temp = items.filter(item => item.parent === child.id);
        if (temp.length !== 0) {
          findChildren(temp);
          child.children = temp;
        }
        return child;
      });

    findChildren(children);
    delete parent.parent;
    familyTree[i] = { ...parent, children };
  });
  return familyTree;
};

const tree = makeTree(data);
console.log(tree);
