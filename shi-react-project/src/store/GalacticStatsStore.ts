import { create } from 'zustand';
import { parseCsvService } from '../services/parseCsv.service';
import type { GalacticStatsType, History } from '../types/types';
import { LocalStorageService } from '../services/localeStorage.service';

const today = new Date();
const formatted = today
  .toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
  .replace(/\//g, '.');

export const useGalacticStatsStore = create<GalacticStats>((set, get) => ({
  stats: null,
  history: LocalStorageService.getToLocaleStorage('history') || [],

  async addStats(file: File | undefined) {
    const currentHistory = get();
    try {
      await parseCsvService.parseGalacticStats(file, (row: GalacticStatsType) => {
        set({
          stats: row,
        });
      });

      set({
        history: [
          ...(currentHistory?.history || []),
          {
            fileName: file?.name || '',
            date: formatted,
            status: true,
            stats: get().stats,
            id: Math.random(),
          },
        ],
      });
      get().setToLocalStorage('history', get().history || []);
    } catch (error) {
      set({
        history: [
          ...(currentHistory?.history || []),
          {
            fileName: file?.name || '',
            date: formatted,
            status: false,
            stats: get().stats,
            id: Math.random(),
          },
        ],
      });
      get().setToLocalStorage('history', get().history || []);
      throw new Error(`Ошибка сервера ${error}`);
    }
  },

  deleteHistory(id: number) {
    const currentHistory = get();
    const filteredHistory = currentHistory.history?.filter((item) => item.id !== id);
    set({
      history: filteredHistory,
    });
    get().setToLocalStorage('history', get().history || []);
  },

  deleteAllHistory() {
    set({
      history: [],
    });
    get().setToLocalStorage('history', get().history || []);
  },

  getToLocaleStorage(key: string): History[] {
    return LocalStorageService.getToLocaleStorage(key);
  },

  setToLocalStorage(key: string, value: History[]) {
    LocalStorageService.setToLocalStorage(key, value);
  },
}));

interface GalacticStats {
  stats: GalacticStatsType | null;
  addStats: (file: File | undefined) => Promise<void>;
  deleteAllHistory: () => void;
  deleteHistory: (id: number) => void;
  history: History[] | null;
  getToLocaleStorage: (key: string) => History[];
  setToLocalStorage: (key: string, value: History[]) => void;
}
