import cloneDeep from 'lodash/cloneDeep';

export const findAndReplace = (
  theList,
  elementId,
  replaceFunction,
  attributeName = 'title',
) => {
  const newList = theList.map(element => {
    if (element[attributeName] === elementId) {
      const newElement = cloneDeep(element);
      return replaceFunction(newElement);
    }
    return element;
  });
  return newList;
};

export const calculateRealCount = stateOptions => {
  const doneFromOptions = stateOptions?.filter(item => item.done === true);
  return {
    count: doneFromOptions.length,
    total: stateOptions?.filter(item => item.showOnList == true).length,
  };
};

export const serializeToUpdateField = array => {
  let stringyfied = JSON.stringify(array);
  return stringyfied;
};

export const isEven = value => {
  return value % 2 === 0;
};
