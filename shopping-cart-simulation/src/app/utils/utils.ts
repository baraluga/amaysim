export const doNothing = () => {};

export const subtractList = (origList: any[], toRemove: any[]) =>
  origList.filter(item => !toRemove.includes(item));
