export const LocalStorageApi = {
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || ' ');
  },
};
