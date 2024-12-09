import axios from 'axios';  

describe('Teste da API de Busca de Local', () => {
  const baseURL = 'https://nominatim.openstreetmap.org/search';

  test('deve retornar informações de local válido', async () => {
    const nomeLocal = 'Joinville'; // Local para testar

    const resposta = await axios.get(baseURL, {
      params: { q: nomeLocal, format: 'json', limit: 1 },
    });

    expect(resposta.status).toBe(200);
    expect(resposta.data).toHaveLength(1);
    expect(resposta.data[0]).toHaveProperty('display_name');
    expect(resposta.data[0].display_name).toContain(nomeLocal);
  });

  test('deve retornar erro ao buscar local inexistente', async () => {
    const nomeLocal = 'LocalInexistente'; 

    try {
      await axios.get(baseURL, {
        params: { q: nomeLocal, format: 'json', limit: 1 },
      });
    } catch (error) {
      expect(error.response.status).toBe(200); 
      expect(error.response.data).toHaveLength(0); 
    }
  });

  test('deve retornar erro se nome do local não for fornecido', async () => {
    try {
      await axios.get(baseURL, {
        params: { format: 'json', limit: 1 },
      });
    } catch (error) {
      expect(error.response.status).toBe(400); 
    }
  });
});
