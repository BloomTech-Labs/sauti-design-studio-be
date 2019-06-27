const data = [
  { id: 1, text: 'Top Tier', owner: null, index: 1 },
  { id: 2, text: 'Low Tier', owner: null, index: 2 },
  { id: 5, text: 'Fox', owner: 1, index: 1 },
  { id: 6, text: 'Falco', owner: 1, index: 2 },
  { id: 7, text: 'Jiggly Puff', owner: 1, index: 3 },
  { id: 8, text: 'Captain Falcon', owner: 1, index: 4 },
  { id: 9, text: 'Sheik', owner: 1, index: 5 },
  { id: 10, text: 'Bowser', owner: 1, index: 1 },
  { id: 11, text: 'Pichu', owner: 2, index: 2 },
  { id: 12, text: 'Yoshi', owner: 2, index: 3 },
  { id: 13, text: 'Roy', owner: 2, index: 4 },
  { id: 14, text: 'Donkey Kong', owner: 2, index: 5 },
  { id: 15, text: 'Stats', owner: 14, index: 1 },
  { id: 16, text: 'Cool', owner: 5, index: 1 },
];

/*
{ id, text, owner, workflow, index }
*/

const makeTree = items => {
  let familyTree = [];
  const parents = items.filter(item => !item.owner);

  parents.forEach((parent, i) => {
    let children = items.filter(child => child.owner === parent.id);

    const findChildren = array =>
      array.forEach(child => {
        let temp = items.filter(item => item.owner === child.id);
        if (temp.length !== 0) {
          findChildren(temp);
          child.children = temp;
        }
        return child;
      });

    findChildren(children);
    delete parent.owner;
    familyTree[i] = { ...parent, children };
  });
  return familyTree;
};

const tree = makeTree(data);
console.log(tree);
