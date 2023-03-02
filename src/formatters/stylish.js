import _ from 'lodash';

const stringify = (data, depth, indentChar) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const currentIndent = indentChar.repeat((depth + 1) * 4);
  const bracketIndent = indentChar.repeat(depth * 4);
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1, indentChar)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const makeStylish = (diff, replacer = ' ') => {
  const operator = {
    added: '+',
    deleted: '-',
    notchanged: ' ',
  };
  const iter = (tree, depth) => tree.map((node) => {
    const indent = replacer.repeat(depth * 4);
    const operatorIndent = indent.slice(2);

    const makeLine = (oper, value) => `${operatorIndent}${oper} ${node.key}: ${stringify(value, depth, replacer)}`;

    switch (node.state) {
      case 'added':
        return makeLine(operator.added, node.value);
      case 'deleted':
        return makeLine(operator.deleted, node.value);
      case 'notChanged':
        return makeLine(operator.notchanged, node.value);
      case 'changed':
        return [`${makeLine(operator.deleted, node.value1)}`,
          `${makeLine(operator.added, node.value2)}`].join('\n');
      case 'nested':
        return `${indent}${node.key}: ${['{', ...iter(node.value, depth + 1), `${indent}}`].join('\n')}`;
      default:
        return '';
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default makeStylish;
