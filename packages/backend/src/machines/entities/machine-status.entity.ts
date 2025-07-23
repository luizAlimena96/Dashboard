import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class MachineStatus {
  @PrimaryColumn()
  id: string;

  @Column()
  timestamp: Date;

  @Column()
  state: 'RUNNING' | 'STOPPED' | 'MAINTENANCE' | 'ERROR';

  @Column('float')
  temperature: number;

  @Column('float')
  rpm: number;

  @Column('int')
  uptime: number;

  @Column('float')
  efficiency: number;

  @Column('float')
  oeeOverall: number;

  @Column('float')
  oeeAvailability: number;

  @Column('float')
  oeePerformance: number;

  @Column('float')
  oeeQuality: number;
}
