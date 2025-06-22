export const csvApi = {
  async getGalacticStatsOut(formData: FormData) {
    const response = await fetch('http://localhost:3000/aggregate?rows=10000', {
      method: 'POST',
      body: formData,
    });

    return response;
  },

  async createCsv() {
    const response = await fetch('http://localhost:3000/report?size=0.01', {
      method: 'GET',
    });

    return response;
  },
};
