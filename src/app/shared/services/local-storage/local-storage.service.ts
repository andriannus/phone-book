import { LocalStorageService } from "./local-storage.model";

export function useLocalStorage(): LocalStorageService {
  function get<T = any>(key: string): T {
    const data = localStorage.getItem(key) || "";
    return JSON.parse(data);
  }

  function set(key: string, value: any): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  function reset(): void {
    localStorage.clear();
  }

  function isExist(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  return { get, isExist, reset, set };
}
