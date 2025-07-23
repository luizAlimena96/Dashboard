import { FullConfig } from '@playwright/test';

export default async function globalSetup() {
  console.log('🔍 Verificando se o backend está acessível em http://localhost:4000...');
  
  const endpoints = [
    'http://localhost:4000/health',
    'http://localhost:4000/',
    'http://localhost:4000/machines'
  ];
  
  let backendIsUp = false;
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Tentando conectar em: ${endpoint}`);
      const response = await fetch(endpoint, { 
        signal: AbortSignal.timeout(2000)
      });
      
      if (response.ok) {
        console.log(`✅ Backend está respondendo em ${endpoint}`);
        backendIsUp = true;
        break;
      } else {
        console.log(`Endpoint ${endpoint} retornou status: ${response.status}`);
      }
    } catch (error) {
      console.log(`Erro ao acessar ${endpoint}:`, error.message);
    }
  }
  
  if (!backendIsUp) {
    throw new Error(
      '❌ Não foi possível conectar ao backend em http://localhost:4000.\n' +
      'Por favor, certifique-se de que o backend está em execução com o comando:\n' +
      'cd packages/backend && npm run start:dev'
    );
  }
  
  console.log('✅ Tudo pronto para executar os testes E2E!');
  return async () => {};
}
