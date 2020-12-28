export const useLocalStorage = () => {
  const get = (key: string): any => {
    const data = localStorage.getItem(key) || "";
    return JSON.parse(data);
  };

  const set = (key: string, value: any): void => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  };

  const reset = (): void => {
    localStorage.clear();
  };

  const isExist = (key: string): boolean => {
    return !!localStorage.getItem(key);
  };

  return { get, isExist, reset, set };
};
