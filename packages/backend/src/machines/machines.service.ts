// machines/machines.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineStatus } from './entities/machine-status.entity';
import { Alert } from './entities/alert.entity';
import { MetricHistory } from './entities/metric-history.entity';
import { AlertDto } from './dto/alert.dto';
import { MachineStatusDto } from './dto/machine-status.dto';
import { MetricHistoryDto } from './dto/metric-history.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(MachineStatus)
    private statusRepository: Repository<MachineStatus>,
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    @InjectRepository(MetricHistory)
    private metricRepository: Repository<MetricHistory>,
  ) {}

  async getAllMachineStatuses(): Promise<MachineStatusDto[]> {
    const statuses = await this.statusRepository.find({
      order: { timestamp: 'DESC' },
    });

    return statuses.map((status) => this.transformToMachineStatusDto(status));
  }

  async getMachineStatusById(id: string): Promise<MachineStatusDto | null> {
    const status = await this.statusRepository.findOne({ where: { id } });

    if (!status) return null;

    return this.transformToMachineStatusDto(status);
  }

  async getAllAlerts(): Promise<AlertDto[]> {
    const alerts = await this.alertRepository.find({
      order: { timestamp: 'DESC' },
    });

    return alerts.map((alert) => this.transformToAlertDto(alert));
  }

  async getMetricHistory(): Promise<MetricHistoryDto[]> {
    const metrics = await this.metricRepository.find({
      order: { timestamp: 'ASC' },
    });

    return metrics.map((metric) => this.transformToMetricHistoryDto(metric));
  }

  async getMachineAlerts(machineId: string): Promise<AlertDto[]> {
    const alerts = await this.alertRepository.find({
      order: { timestamp: 'DESC' },
    });

    return alerts.map((alert) => this.transformToAlertDto(alert));
  }

  async getMachineMetrics(
    machineId: string,
    limit: number = 30,
    offset = 0,
  ): Promise<MetricHistoryDto[]> {
    const metrics = await this.metricRepository.find({
      order: { timestamp: 'ASC' },
      skip: offset,
      take: limit,
    });

    return metrics.map((metric) => this.transformToMetricHistoryDto(metric));
  }

  async addMetric(
    machineId: string,
    metricData: Omit<MetricHistoryDto, 'timestamp'>,
  ): Promise<MetricHistoryDto> {
    const newMetric = {
      id: `${Date.now()}`,
      timestamp: new Date().toISOString(),
      temperature: metricData.temperature,
      rpm: metricData.rpm,
      efficiency: metricData.efficiency,
    };

    const savedMetric = await this.metricRepository.save(newMetric);
    return this.transformToMetricHistoryDto(savedMetric);
  }

  async clearMetrics(machineId: string): Promise<void> {
    await this.metricRepository.clear();
  }

  async getMachineIds(): Promise<string[]> {
    const statuses = await this.statusRepository.find({
      select: ['id'],
    });

    return statuses.map((status) => status.id);
  }
  private transformToMachineStatusDto(entity: MachineStatus): MachineStatusDto {
    return {
      id: entity.id,
      timestamp: new Date(entity.timestamp),
      state: entity.state,
      metrics: {
        temperature: entity.temperature,
        rpm: entity.rpm,
        uptime: entity.uptime,
        efficiency: entity.efficiency,
      },
      oee: {
        overall: entity.oeeOverall,
        availability: entity.oeeAvailability,
        performance: entity.oeePerformance,
        quality: entity.oeeQuality,
      },
    };
  }

  private transformToAlertDto(entity: Alert): AlertDto {
    return {
      id: entity.id,
      level: entity.level,
      message: entity.message,
      timestamp: new Date(entity.timestamp),
    };
  }

  private transformToMetricHistoryDto(entity: MetricHistory): MetricHistoryDto {
    return {
      id: entity.id,
      timestamp: new Date(entity.timestamp),
      temperature: entity.temperature,
      rpm: entity.rpm,
      efficiency: entity.efficiency,
    };
  }
}
