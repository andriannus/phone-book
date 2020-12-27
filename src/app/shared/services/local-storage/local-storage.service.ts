export const useLocalStorage = () => {
  const get = (key: string) => {
    const data = localStorage.getItem(key) || "";
    return JSON.parse(data);
  };

  const set = (key: string, value: any) => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  };

  const reset = () => {
    localStorage.clear();
  };

  const isExist = (key: string) => {
    return !!localStorage.getItem(key);
  };

  return { get, isExist, reset, set };
};
