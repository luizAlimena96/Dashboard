import { Repository } from 'typeorm';
import { MachineStatus } from './entities/machine-status.entity';
import { Alert } from './entities/alert.entity';
import { MetricHistory } from './entities/metric-history.entity';
import { AlertDto } from './dto/alert.dto';
import { MachineStatusDto } from './dto/machine-status.dto';
import { MetricHistoryDto } from './dto/metric-history.dto';
import { MachineResponseDto } from './dto/machine-response.dto';
export declare class MachinesService {
    private statusRepository;
    private alertRepository;
    private metricRepository;
    constructor(statusRepository: Repository<MachineStatus>, alertRepository: Repository<Alert>, metricRepository: Repository<MetricHistory>);
    getAllMachineStatuses(): Promise<MachineStatusDto[]>;
    getMachineStatusById(id: string): Promise<MachineStatusDto | null>;
    getAllMachineResponses(): Promise<MachineResponseDto[]>;
    getAllAlerts(): Promise<AlertDto[]>;
    getMetricHistory(): Promise<MetricHistoryDto[]>;
    getMachineAlerts(machineId: string): Promise<AlertDto[]>;
    getMachineMetrics(machineId: string, limit?: number, offset?: number): Promise<MetricHistoryDto[]>;
    addMetric(machineId: string, metricData: Omit<MetricHistoryDto, 'timestamp'>): Promise<MetricHistoryDto>;
    clearMetrics(machineId: string): Promise<void>;
    getMachineIds(): Promise<string[]>;
    private transformToMachineStatusDto;
    private transformToAlertDto;
    private transformToMetricHistoryDto;
}
