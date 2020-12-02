export const randomNumberInterval = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};
