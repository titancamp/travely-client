export const ArraySum = (data, propName) => {
  if (!data.length) {
    return 0;
  }

  if (propName) {
    return data.reduce(function (sum, item) {
      return sum + +item[propName];
    }, 0);
  } else {
    return data.reduce(function (sum, item) {
      return sum + +item;
    });
  }
};

export const ArrayGroup = (data, propName) => {
  var groupNames = [],
    groups = [];

  if (!data) {
    return [];
  }

  data.forEach(function (item) {
    var groupName = item[propName],
      index = groupNames.indexOf(groupName);

    if (index === -1) {
      groupNames.push(groupName);
      index = groups.push({ name: groupName, items: [] }) - 1;
    }

    groups[index].items.push(item);
  });

  return groups;
};
