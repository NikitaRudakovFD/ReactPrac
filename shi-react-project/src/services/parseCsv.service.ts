import { csvApi } from '../api/parseCsv.api';
import type { GalacticStatsType } from '../types/types';

export const parseCsvService = {
  stats: {},
  async parseGalacticStats(
    file: File | undefined,
    callBack: (row: GalacticStatsType, status: boolean) => void,
  ) {
    if (!file) throw new Error('Отсутствует файл');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await csvApi.getGalacticStatsOut(formData);

      if (response.ok) {
        await this.parseStream(response, callBack);
      }
    } catch (error) {
      throw new Error(`Ошибка ${error}`);
    }
  },

  async parseStream(
    response: Response,
    callBack: (row: GalacticStatsType, status: boolean) => void,
  ) {
    if (!response.body) return;
    const reader = response.body.getReader();
    let buffer = '';

    while (true) {
      try {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value);

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            const parsedValue = JSON.parse(line);
            callBack(parsedValue, response.ok);
          }
        }
      } catch (error) {
        throw new Error(`Ошибка парсинга: ${error}`);
      }
    }
  },

  async createCsv() {
    try {
      const response = await csvApi.createCsv();
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'report.csv';
      link.href = downloadUrl;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw new Error(`Ошибка ${error}`);
    }
  },
};
