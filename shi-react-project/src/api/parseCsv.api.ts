interface HttpClient {
  request: (url: string, options: RequestInit) => Promise<Response>;
  get: (url: string) => Promise<Response>;
}

const defaultHttpClient: HttpClient = {
  request: (url, options) => fetch(url, options),
  get: (url) => fetch(url, { method: 'GET' }),
};

export const createCsvApi = (httpClient: HttpClient = defaultHttpClient) => ({
  async getGalacticStatsOut(formData: FormData) {
    const response = await httpClient.request('http://localhost:3000/aggregate?rows=10000', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  },

  async createCsv() {
    return httpClient.get('http://localhost:3000/report?size=0.01');
  },
});

export const csvApi = createCsvApi();
