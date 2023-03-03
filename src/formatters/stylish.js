const stringifyStylish = (data, depth, indentChar) => {
  if (typeof data !== 'object' || data === null) {
    return String(data);
  }
  const currentIndent = indentChar.repeat((depth + 1) * 4);
  const bracketIndent = indentChar.repeat(depth * 4);
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${currentIndent}${key}: ${stringifyStylish(value, depth + 1, indentChar)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default (diff, indentChar = ' ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const indent = indentChar.repeat(depth * 4);
    const operatorIndent = indent.slice(2);
    const operators = {
      added: '+',
      deleted: '-',
      notChanged: ' ',
    };
    switch (node.state) {
      case 'added':
        return `${operatorIndent}${operators.added} ${node.key}: ${stringifyStylish(node.value, depth, indentChar)}`;
      case 'deleted':
        return `${operatorIndent}${operators.deleted} ${node.key}: ${stringifyStylish(node.value, depth, indentChar)}`;
      case 'notChanged':
        return `${operatorIndent}${operators.notChanged} ${node.key}: ${stringifyStylish(node.value, depth, indentChar)}`;
      case 'changed':
        return [`${operatorIndent}${operators.deleted} ${node.key}: ${stringifyStylish(node.value1, depth, indentChar)}`,
          `${operatorIndent}${operators.added} ${node.key}: ${stringifyStylish(node.value2, depth, indentChar)}`].join('\n');
      case 'nested':
        return `${indent}${node.key}: ${['{', ...iter(node.value, depth + 1), `${indent}}`].join('\n')}`;
      default:
        throw new Error(`unknown state '${node.state}'.`);
    }
  });

  const stylishResult = iter(diff, 1);
  return ['{', ...stylishResult, '}'].join('\n');
};
