// machines/machines.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { AlertDto } from './dto/alert.dto';
import { MachineStatusDto } from './dto/machine-status.dto';
import { MetricHistoryDto } from './dto/metric-history.dto';
import { MachineResponseDto } from './dto/machine-response.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get(':id/status')
  async getStatus(@Param('id') id: string): Promise<MachineStatusDto> {
    const status = await this.machinesService.getMachineStatusById(id);

    if (!status) {
      throw new HttpException('Machine status not found', HttpStatus.NOT_FOUND);
    }

    return status;
  }

  @Get(':id/alerts')
  async getAlerts(@Param('id') id: string): Promise<AlertDto[]> {
    return this.machinesService.getMachineAlerts(id);
  }

  @Get(':id/metrics')
  async getMetrics(
    @Param('id') id: string,
    @Query('limit') limit = 30,
    @Query('offset') offset = 0,
  ): Promise<MetricHistoryDto[]> {
    return this.machinesService.getMachineMetrics(id, limit, offset);
  }

  @Post(':id/metrics')
  async addMetric(
    @Param('id') id: string,
    @Body() metric: Omit<MetricHistoryDto, 'timestamp'>,
  ): Promise<MetricHistoryDto> {
    return this.machinesService.addMetric(id, metric);
  }

  @Delete(':id/metrics')
  async clearMetrics(@Param('id') id: string): Promise<void> {
    return this.machinesService.clearMetrics(id);
  }

  @Get('ids')
  async getMachineIds(): Promise<string[]> {
    return this.machinesService.getMachineIds();
  }

  @Get('status')
  async getAllMachineStatuses(): Promise<MachineStatusDto[]> {
    return await this.machinesService.getAllMachineStatuses();
  }

  @Get()
  async getAllMachines(): Promise<any[]> {
    const responses = await this.machinesService.getAllMachineResponses();
    
    return responses.map(machine => ({
      id: machine.machineId,
      name: machine.name,
      status: machine.status.toLowerCase()
    }));
  }

  @Get('alerts')
  async getAllAlerts(): Promise<AlertDto[]> {
    return await this.machinesService.getAllAlerts();
  }

  @Get('metrics/history')
  async getMetricHistory(): Promise<MetricHistoryDto[]> {
    return await this.machinesService.getMetricHistory();
  }

  @Get('alerts/:level')
  async getAlertsByLevel(
    @Param('level') level: 'INFO' | 'WARNING' | 'CRITICAL',
  ): Promise<AlertDto[]> {
    const allAlerts = await this.machinesService.getAllAlerts();
    return allAlerts.filter((alert) => alert.level === level);
  }
  @Get('metrics/recent')
  async getRecentMetrics(): Promise<MetricHistoryDto[]> {
    const metrics = await this.machinesService.getMetricHistory();
    return metrics.slice(-20);
  }
}
