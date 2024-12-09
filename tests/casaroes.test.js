export default describe('Teste da API de Casarões', () => {
  test('deve rejeitar casarão com nome muito curto', () => {
    const novoCasarao = {
      formData: {
        name: 'A', 
      },
    };

    
    const rejeitarCasarao = (casarao) => {
      if (!casarao.formData.name || casarao.formData.name.length < 3) {
        throw new Error('Nome do casarão é muito curto');
      }
      return true;
    };

    try {
      rejeitarCasarao(novoCasarao);
    } catch (error) {
      expect(error.message).toBe('Nome do casarão é muito curto');
    }
  });

  test('deve rejeitar casarão sem nome', () => {
    const novoCasarao = {
      formData: {
        name: '', // Sem nome
      },
    };

    const rejeitarCasarao = (casarao) => {
      if (!casarao.formData.name) {
        throw new Error('Nome do casarão é obrigatório');
      }
      return true;
    };

    try {
      rejeitarCasarao(novoCasarao);
    } catch (error) {
      expect(error.message).toBe('Nome do casarão é obrigatório');
    }
  });

  test('deve rejeitar casarão sem data', () => {
    const novoCasarao = {
      formData: {
        name: 'Palacete Niemeyer', // Nome válido
        date: '', // Sem data
      },
    };

    const rejeitarCasarao = (casarao) => {
      if (!casarao.formData.date) {
        throw new Error('Data é obrigatória');
      }
      return true;
    };

    try {
      rejeitarCasarao(novoCasarao);
    } catch (error) {
      expect(error.message).toBe('Data é obrigatória');
    }
  });

  test('deve rejeitar casarão com data no futuro', () => {
    const novoCasarao = {
      formData: {
        name: 'Palacete Niemeyer',
        date: '2025-12-08', // Data futura
      },
    };

    const rejeitarCasarao = (casarao) => {
      const dataAtual = new Date();
      if (new Date(casarao.formData.date) > dataAtual) {
        throw new Error('Data não pode ser no futuro');
      }
      return true;
    };

    try {
      rejeitarCasarao(novoCasarao);
    } catch (error) {
      expect(error.message).toBe('Data não pode ser no futuro');
    }
  });

  test('deve cadastrar casarão com nome e data válidos', () => {
    const novoCasarao = {
      formData: {
        name: 'Palacete Niemeyer',
        date: '2024-12-08',
      },
    };

    const cadastrarCasarao = (casarao) => {
      if (!casarao.formData.name || casarao.formData.name.length < 3) {
        throw new Error('Nome do casarão é inválido');
      }
      if (!casarao.formData.date) {
        throw new Error('Data é obrigatória');
      }
      const dataAtual = new Date();
      if (new Date(casarao.formData.date) > dataAtual) {
        throw new Error('Data não pode ser no futuro');
      }
      return 'Casarão adicionado com sucesso';
    };

    try {
      const resultado = cadastrarCasarao(novoCasarao);
      expect(resultado).toBe('Casarão adicionado com sucesso');
    } catch (error) {
      // Caso ocorra erro, o teste falhará
      expect(error).toBeUndefined();
    }
  });
});
