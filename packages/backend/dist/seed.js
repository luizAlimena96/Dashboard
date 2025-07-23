"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const machine_status_entity_1 = require("./machines/entities/machine-status.entity");
const alert_entity_1 = require("./machines/entities/alert.entity");
const metric_history_entity_1 = require("./machines/entities/metric-history.entity");
async function seed() {
    const dataSource = new typeorm_1.DataSource({
        type: 'sqlite',
        database: 'mock.db',
        entities: [machine_status_entity_1.MachineStatus, alert_entity_1.Alert, metric_history_entity_1.MetricHistory],
        synchronize: true,
    });
    await dataSource.initialize();
    const statusRepository = dataSource.getRepository(machine_status_entity_1.MachineStatus);
    const alertsRepository = dataSource.getRepository(alert_entity_1.Alert);
    const metricsRepository = dataSource.getRepository(metric_history_entity_1.MetricHistory);
    await statusRepository.clear();
    await alertsRepository.clear();
    await metricsRepository.clear();
    const states = [
        'RUNNING',
        'STOPPED',
        'MAINTENANCE',
        'ERROR',
    ];
    const alertLevels = [
        'INFO',
        'WARNING',
        'CRITICAL',
    ];
    const alerts = ['Temp. Alta', 'RPM Baixo', 'Manutenção Próxima'];
    const now = new Date();
    for (let i = 0; i < 120; i++) {
        const timestamp = new Date(now.getTime() - i * 2000);
        const state = states[Math.floor(i / 30) % states.length];
        const temperature = 70 + Math.random() * 30;
        const rpm = 800 + Math.random() * 700;
        const efficiency = 80 + Math.random() * 20;
        await statusRepository.save({
            id: `${i}`,
            timestamp,
            state,
            temperature,
            rpm,
            uptime: 3600 * (i + 1),
            efficiency,
            oeeOverall: 70 + Math.random() * 30,
            oeeAvailability: 75 + Math.random() * 25,
            oeePerformance: 80 + Math.random() * 20,
            oeeQuality: 85 + Math.random() * 15,
        });
        await metricsRepository.save({
            id: `${i}`,
            timestamp,
            temperature,
            rpm,
            efficiency,
        });
        let level = alertLevels[i % alertLevels.length];
        const alertType = alerts[i % alerts.length];
        if (alertType === 'Temp. Alta') {
            level = 'CRITICAL';
        }
        else if (alertType === 'RPM Baixo') {
            level = 'WARNING';
        }
        else if (alertType === 'Manutenção Próxima') {
            level = 'INFO';
        }
        await alertsRepository.save({
            id: `${i}`,
            level,
            message: `${level}: ${alertType}`,
            timestamp,
        });
    }
    console.log('Seed concluído com sucesso!');
    await dataSource.destroy();
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map