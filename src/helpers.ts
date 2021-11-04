export const includes = <T>(arr: T[], item: T): boolean => {
  for (let el of arr) {
    if (item === el) {
      return true;
    }
  }
  return false;
};
