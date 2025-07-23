import { DataSource } from 'typeorm';
import { MachineStatus } from './machines/entities/machine-status.entity';
import { Alert } from './machines/entities/alert.entity';
import { MetricHistory } from './machines/entities/metric-history.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'mock.db',
    entities: [MachineStatus, Alert, MetricHistory],
    synchronize: true,
  });

  await dataSource.initialize();

  const statusRepository = dataSource.getRepository(MachineStatus);
  const alertsRepository = dataSource.getRepository(Alert);
  const metricsRepository = dataSource.getRepository(MetricHistory);
  await statusRepository.clear();
  await alertsRepository.clear();
  await metricsRepository.clear();

  const states: Array<'RUNNING' | 'STOPPED' | 'MAINTENANCE' | 'ERROR'> = [
    'RUNNING',
    'STOPPED',
    'MAINTENANCE',
    'ERROR',
  ];
  const alertLevels: Array<'INFO' | 'WARNING' | 'CRITICAL'> = [
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

    let level: 'INFO' | 'WARNING' | 'CRITICAL' =
      alertLevels[i % alertLevels.length];
    const alertType = alerts[i % alerts.length];

    if (alertType === 'Temp. Alta') {
      level = 'CRITICAL';
    } else if (alertType === 'RPM Baixo') {
      level = 'WARNING';
    } else if (alertType === 'Manutenção Próxima') {
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
