export const debounce = <T extends Function>(callback: T, wait: number) => {
  let timeout: number;

  return (...args: any[]): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};
