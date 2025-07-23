import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineStatus } from './entities/machine-status.entity';
import { MetricHistory } from './entities/metric-history.entity';
import { Alert } from './entities/alert.entity';
import { MachinesController } from './machines.controller';
import { MachinesService } from './machines.service';

@Module({
  imports: [TypeOrmModule.forFeature([MachineStatus, Alert, MetricHistory])],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}
