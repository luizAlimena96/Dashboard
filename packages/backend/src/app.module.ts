import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinesModule } from './machines/machines.module';
import { HealthController } from './health/health.controller';
@Module({
  controllers: [HealthController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mock.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MachinesModule,
  ],
})
export class AppModule {}
