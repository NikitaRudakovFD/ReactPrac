import type { HistoryType } from '../types/types';

// storageApi.ts
interface StorageClient {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
}

const defaultStorageClient: StorageClient = {
  setItem: (key, value) => localStorage.setItem(key, value),
  getItem: (key) => localStorage.getItem(key),
};

export const createLocalStorageApi = (storage: StorageClient = defaultStorageClient) => ({
  set(key: string, value: HistoryType[]): void {
    storage.setItem(key, JSON.stringify(value));
  },

  get(key: string): HistoryType[] | undefined {
    const item = storage.getItem(key);

    if (!item) return;

    return JSON.parse(item);
  },
});

export const LocalStorageApi = createLocalStorageApi();
