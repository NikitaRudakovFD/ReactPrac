// storageApi.test.ts
import { describe, it, expect, vi } from 'vitest';
import { createLocalStorageApi } from './localStorage.api';
import type { HistoryType } from '../types/types';

describe('проверка работы с localStorage', () => {
  const mockStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
  };

  const storageApi = createLocalStorageApi(mockStorage);
  const testKey = 'test-key';
  const testData: HistoryType[] = [
    { fileName: 'test', status: false, date: '13', stats: null, id: 1 },
  ];

  describe('set', () => {
    it('сохраняет данные в storage', () => {
      storageApi.set(testKey, testData);

      expect(mockStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testData));
    });
  });

  describe('get', () => {
    it('возвращает данные при их наличии', () => {
      mockStorage.getItem.mockReturnValueOnce(JSON.stringify(testData));

      const result = storageApi.get(testKey);

      expect(mockStorage.getItem).toHaveBeenCalledWith(testKey);
      expect(result).toEqual(testData);
    });

    it('возвращает undefined при отсутствии данных', () => {
      mockStorage.getItem.mockReturnValueOnce(null);

      const result = storageApi.get(testKey);

      expect(result).toBeUndefined();
    });
  });
});
