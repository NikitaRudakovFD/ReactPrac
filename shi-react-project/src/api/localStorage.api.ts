export const LocalStorageApi = {
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key: string) {
    const item = localStorage.getItem(key);
    if (!item) {
      return;
    }
    return JSON.parse(item);
  },
};
