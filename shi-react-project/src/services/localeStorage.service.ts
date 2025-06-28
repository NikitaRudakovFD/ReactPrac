import { LocalStorageApi } from '../api/localStorage.api';

export const LocalStorageService = {
  getToLocaleStorage(key: string) {
    const result = LocalStorageApi.get(key);
    return result;
  },

  setToLocalStorage(key: string, value: unknown) {
    LocalStorageApi.set(key, value);
  },
};
