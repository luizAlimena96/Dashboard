import { MachinesService } from './machines.service';
import { AlertDto } from './dto/alert.dto';
import { MachineStatusDto } from './dto/machine-status.dto';
import { MetricHistoryDto } from './dto/metric-history.dto';
export declare class MachinesController {
    private readonly machinesService;
    constructor(machinesService: MachinesService);
    getStatus(id: string): Promise<MachineStatusDto>;
    getAlerts(id: string): Promise<AlertDto[]>;
    getMetrics(id: string, limit?: number, offset?: number): Promise<MetricHistoryDto[]>;
    addMetric(id: string, metric: Omit<MetricHistoryDto, 'timestamp'>): Promise<MetricHistoryDto>;
    clearMetrics(id: string): Promise<void>;
    getMachineIds(): Promise<string[]>;
    getAllMachineStatuses(): Promise<MachineStatusDto[]>;
    getAllAlerts(): Promise<AlertDto[]>;
    getMetricHistory(): Promise<MetricHistoryDto[]>;
    getAlertsByLevel(level: 'INFO' | 'WARNING' | 'CRITICAL'): Promise<AlertDto[]>;
    getRecentMetrics(): Promise<MetricHistoryDto[]>;
}
