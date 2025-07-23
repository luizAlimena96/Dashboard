"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachinesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const machine_status_entity_1 = require("./entities/machine-status.entity");
const alert_entity_1 = require("./entities/alert.entity");
const metric_history_entity_1 = require("./entities/metric-history.entity");
let MachinesService = class MachinesService {
    statusRepository;
    alertRepository;
    metricRepository;
    constructor(statusRepository, alertRepository, metricRepository) {
        this.statusRepository = statusRepository;
        this.alertRepository = alertRepository;
        this.metricRepository = metricRepository;
    }
    async getAllMachineStatuses() {
        const statuses = await this.statusRepository.find({
            order: { timestamp: 'DESC' },
        });
        return statuses.map((status) => this.transformToMachineStatusDto(status));
    }
    async getMachineStatusById(id) {
        const status = await this.statusRepository.findOne({ where: { id } });
        if (!status)
            return null;
        return this.transformToMachineStatusDto(status);
    }
    async getAllAlerts() {
        const alerts = await this.alertRepository.find({
            order: { timestamp: 'DESC' },
        });
        return alerts.map((alert) => this.transformToAlertDto(alert));
    }
    async getMetricHistory() {
        const metrics = await this.metricRepository.find({
            order: { timestamp: 'ASC' },
        });
        return metrics.map((metric) => this.transformToMetricHistoryDto(metric));
    }
    async getMachineAlerts(machineId) {
        const alerts = await this.alertRepository.find({
            order: { timestamp: 'DESC' },
        });
        return alerts.map((alert) => this.transformToAlertDto(alert));
    }
    async getMachineMetrics(machineId, limit = 30, offset = 0) {
        const metrics = await this.metricRepository.find({
            order: { timestamp: 'ASC' },
            skip: offset,
            take: limit,
        });
        return metrics.map((metric) => this.transformToMetricHistoryDto(metric));
    }
    async addMetric(machineId, metricData) {
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
    async clearMetrics(machineId) {
        await this.metricRepository.clear();
    }
    async getMachineIds() {
        const statuses = await this.statusRepository.find({
            select: ['id'],
        });
        return statuses.map((status) => status.id);
    }
    transformToMachineStatusDto(entity) {
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
    transformToAlertDto(entity) {
        return {
            id: entity.id,
            level: entity.level,
            message: entity.message,
            timestamp: new Date(entity.timestamp),
        };
    }
    transformToMetricHistoryDto(entity) {
        return {
            id: entity.id,
            timestamp: new Date(entity.timestamp),
            temperature: entity.temperature,
            rpm: entity.rpm,
            efficiency: entity.efficiency,
        };
    }
};
exports.MachinesService = MachinesService;
exports.MachinesService = MachinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(machine_status_entity_1.MachineStatus)),
    __param(1, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __param(2, (0, typeorm_1.InjectRepository)(metric_history_entity_1.MetricHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MachinesService);
//# sourceMappingURL=machines.service.js.map