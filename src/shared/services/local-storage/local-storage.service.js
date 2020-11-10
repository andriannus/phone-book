export const useLocalStorage = () => {
  const get = key => {
    const data = localStorage.getItem(key) || "";
    return JSON.parse(data);
  };

  const set = (key, value) => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  };

  const reset = () => {
    localStorage.clear();
  };

  const isExist = key => {
    return !!localStorage.getItem(key);
  };

  return { get, isExist, reset, set };
};
