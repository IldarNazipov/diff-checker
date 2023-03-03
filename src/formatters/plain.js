const stringifyPlain = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (diff) => {
  const iter = (tree, parent) => tree.flatMap((node) => {
    const path = [...parent, node.key].join('.');

    switch (node.state) {
      case 'added':
        return `Property '${path}' was added with value: ${stringifyPlain(node.value)}`;
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'changed':
        return `Property '${path}' was updated. From ${stringifyPlain(node.value1)} to ${stringifyPlain(node.value2)}`;
      case 'notChanged':
        return [];
      case 'nested':
        return `${iter(node.children, [path]).join('\n')}`;
      default:
        throw new Error(`unknown state '${node.state}'.`);
    }
  });

  return iter(diff, []).join('\n');
};
