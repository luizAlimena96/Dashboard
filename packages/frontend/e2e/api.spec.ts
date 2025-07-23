import { test, expect } from '@playwright/test';

test.describe('API Integration Tests', () => {
  test('should fetch machine data from backend', async ({ request }) => {
    const response = await request.get('http://localhost:4000/machines/status');
    
    expect(response.status()).toBe(200);
    
    const machines = await response.json();
    
    expect(Array.isArray(machines)).toBeTruthy();
    
    if (machines.length > 0) {
      const machine = machines[0];
      expect(machine).toHaveProperty('id');
      expect(machine).toHaveProperty('state');
      expect(machine).toHaveProperty('metrics');
      expect(machine).toHaveProperty('timestamp');
    }
  });
});
