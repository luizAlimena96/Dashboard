import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get(['/', '/health'])
  healthCheck() {
    return { 
      status: 'OK',
      timestamp: new Date().toISOString() 
    };
  }

  @Get('machines')
  machinesCheck() {
    return { 
      status: 'OK',
      message: 'Machines endpoint is working' 
    };
  }
}