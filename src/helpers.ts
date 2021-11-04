export const includes = <T>(arr: T[], item: T): boolean => {
  for (let el of arr) {
    if (item === el) {
      return true;
    }
  }
  return false;
};

export const capitalize = (s :string): string => {
	if (s.length === 0) return "";
	return s[0].toUpperCase() + s.slice(1).toLowerCase()
}
