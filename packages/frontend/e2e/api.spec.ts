import { test, expect } from '@playwright/test';

test.describe('API Integration Tests', () => {
  test('should fetch machine data from backend', async ({ request }) => {
    // Test backend API directly
    const response = await request.get('http://localhost:4000/machines');
    
    // Check if the response is successful
    expect(response.status()).toBe(200);
    
    // Parse the response body
    const machines = await response.json();
    
    // Verify the response structure
    expect(Array.isArray(machines)).toBeTruthy();
    
    // If there are machines, check their structure
    if (machines.length > 0) {
      const machine = machines[0];
      expect(machine).toHaveProperty('id');
      expect(machine).toHaveProperty('name');
      expect(machine).toHaveProperty('status');
    }
  });

  test('should display machine data in the UI', async ({ page }) => {
    // Navigate to the page that displays machine data
    await page.goto('/');
    
    // Wait for the machine data to be loaded
    // This assumes you have a loading state that gets removed when data is loaded
    await page.waitForSelector('[data-testid="machine-card"]', { state: 'visible' });
    
    // Check if machine cards are displayed
    const machineCards = await page.locator('[data-testid="machine-card"]').count();
    expect(machineCards).toBeGreaterThan(0);
    
    // Check if machine status is displayed
    const firstMachineStatus = await page.locator('[data-testid="machine-status"]').first().textContent();
    expect(firstMachineStatus).toMatch(/running|stopped|warning|error/i);
  });
});
