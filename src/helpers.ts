export const includes = <T>(arr: T[], item: T): boolean => {
  for (let el of arr) {
    if (item === el) {
      return true;
    }
  }
  return false;
};

export const capitalize = (s: string): string => {
  if (s.length === 0) return "";
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
};

export const calculateStars = (v: number, base: number) => {
  // full > .80 && integers
  // .80 > half > .20
  // .20 > empty
  let full = Math.floor(v);
  let half = 0;
  let empty = base - full;

  if (v - full > 0.8) {
    empty--;
    full++;
  } else if (v - full > 0.2) {
    half++;
    empty--;
  }

  return { full, half, empty };
};

export const genArrayOfNElements = (n: number): number[] => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};
