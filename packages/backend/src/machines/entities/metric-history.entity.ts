import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class MetricHistory {
  @PrimaryColumn()
  id: string;

  @Column()
  timestamp: Date;

  @Column('float')
  temperature: number;

  @Column('float')
  rpm: number;

  @Column('float')
  efficiency: number;
}
