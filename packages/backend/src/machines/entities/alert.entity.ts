import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Alert {
  @PrimaryColumn()
  id: string;

  @Column()
  level: 'INFO' | 'WARNING' | 'CRITICAL';

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
