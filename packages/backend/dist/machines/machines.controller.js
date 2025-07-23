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
exports.MachinesController = void 0;
const common_1 = require("@nestjs/common");
const machines_service_1 = require("./machines.service");
let MachinesController = class MachinesController {
    machinesService;
    constructor(machinesService) {
        this.machinesService = machinesService;
    }
    async getStatus(id) {
        const status = await this.machinesService.getMachineStatusById(id);
        if (!status) {
            throw new common_1.HttpException('Machine status not found', common_1.HttpStatus.NOT_FOUND);
        }
        return status;
    }
    async getAlerts(id) {
        return this.machinesService.getMachineAlerts(id);
    }
    async getMetrics(id, limit = 30, offset = 0) {
        return this.machinesService.getMachineMetrics(id, limit, offset);
    }
    async addMetric(id, metric) {
        return this.machinesService.addMetric(id, metric);
    }
    async clearMetrics(id) {
        return this.machinesService.clearMetrics(id);
    }
    async getMachineIds() {
        return this.machinesService.getMachineIds();
    }
    async getAllMachineStatuses() {
        return await this.machinesService.getAllMachineStatuses();
    }
    async getAllMachines() {
        const responses = await this.machinesService.getAllMachineResponses();
        return responses.map(machine => ({
            id: machine.machineId,
            name: machine.name,
            status: machine.status.toLowerCase()
        }));
    }
    async getAllAlerts() {
        return await this.machinesService.getAllAlerts();
    }
    async getMetricHistory() {
        return await this.machinesService.getMetricHistory();
    }
    async getAlertsByLevel(level) {
        const allAlerts = await this.machinesService.getAllAlerts();
        return allAlerts.filter((alert) => alert.level === level);
    }
    async getRecentMetrics() {
        const metrics = await this.machinesService.getMetricHistory();
        return metrics.slice(-20);
    }
};
exports.MachinesController = MachinesController;
__decorate([
    (0, common_1.Get)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)(':id/alerts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Get)(':id/metrics'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Post)(':id/metrics'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "addMetric", null);
__decorate([
    (0, common_1.Delete)(':id/metrics'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "clearMetrics", null);
__decorate([
    (0, common_1.Get)('ids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getMachineIds", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getAllMachineStatuses", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getAllMachines", null);
__decorate([
    (0, common_1.Get)('alerts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getAllAlerts", null);
__decorate([
    (0, common_1.Get)('metrics/history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getMetricHistory", null);
__decorate([
    (0, common_1.Get)('alerts/:level'),
    __param(0, (0, common_1.Param)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getAlertsByLevel", null);
__decorate([
    (0, common_1.Get)('metrics/recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MachinesController.prototype, "getRecentMetrics", null);
exports.MachinesController = MachinesController = __decorate([
    (0, common_1.Controller)('machines'),
    __metadata("design:paramtypes", [machines_service_1.MachinesService])
], MachinesController);
//# sourceMappingURL=machines.controller.js.map