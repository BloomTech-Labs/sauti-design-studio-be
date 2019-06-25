/* eslint-disable prefer-const */
const arr = [
  {
    id: 1,
    question_text: 'Character list',
    order: 1,
    workflow_id: 1,
    screen: 1,
  },
  {
    id: 2,
    question_text: 'Top Tier',
    order: 2,
    workflow_id: 1,
    screen: 1,
  },
  {
    id: 2,
    question_text: 'Top Tier',
    order: 2,
    workflow_id: 1,
    screen: 1,
  },
];
const arrrr = () => {
  let line = '';
  for (const chr of 'hl;jk;i') {
    line = line.concat('=');
  }
  return line;
};
console.log('TCL: arrrr', arrrr());
// const t = () => {
//   for (const i of arr[1].question_text.length) {
//     return '=';
//   }
// };

// const opt = `${arr[0].order}. ${arr[0].question_text}`;

const stringyList = options =>
  Object.keys(options)
    .map((obj, i) => `${options[obj].order}. ${options[obj].question_text}`)
    .toString()
    .split(',')
    .join('\n');
// .slice('\n', '');

//             .toString()
// .join("' \n'")
// .slice('\n', '');
