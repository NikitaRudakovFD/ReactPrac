// csvApi.test.ts
import { describe, it, expect, vi } from 'vitest';
import { createCsvApi } from './parseCsv.api';

describe('проверка api', () => {
  const mockHttpClient = {
    request: vi.fn(),
    get: vi.fn(),
  };

  const csvApi = createCsvApi(mockHttpClient);
  const mockFormData = new FormData();

  describe('getGalacticStatsOut', () => {
    it('должен выполнить Post-запрос с правильным параметрами', async () => {
      const mockResponse = { ok: true, body: ReadableStream };
      mockHttpClient.request.mockResolvedValue(mockResponse);

      const result = await csvApi.getGalacticStatsOut(mockFormData);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        'http://localhost:3000/aggregate?rows=10000',
        {
          method: 'POST',
          body: mockFormData,
        },
      );
      expect(result).toBe(mockResponse);
    });

    it('запрос должен упасть, если ответ пришел с ошибкой', async () => {
      const mockResponse = { ok: false, status: 500 } as Response;
      mockHttpClient.request.mockResolvedValue(mockResponse);

      await expect(csvApi.getGalacticStatsOut(mockFormData)).rejects.toThrow(
        'HTTP error! status: 500',
      );
    });
  });

  describe('createCsv', () => {
    it('должен выполнять Get-запрос по правильному URL ', async () => {
      const mockResponse = { ok: true } as Response;
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await csvApi.createCsv();

      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:3000/report?size=0.01');
      expect(result).toBe(mockResponse);
    });
  });
});
