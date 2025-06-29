import { LocalStorageApi } from '../api/localStorage.api';
import type { HistoryType } from '../types/types';

export const LocalStorageService = {
  getToLocaleStorage(key: string) {
    const result = LocalStorageApi.get(key);
    return result;
  },

  setToLocalStorage(key: string, value: HistoryType[]) {
    LocalStorageApi.set(key, value);
  },
};
