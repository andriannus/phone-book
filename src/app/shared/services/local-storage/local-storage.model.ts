export interface LocalStorageService {
  get: <T = any>(key: string) => T;
  isExist: (key: string) => boolean;
  reset: () => void;
  set: (key: string, value: any) => void;
}
