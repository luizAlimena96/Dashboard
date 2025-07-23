export interface AlertDto {
  id: string;
  level: 'INFO' | 'AVISO' | 'CRÍTICO';
  message: string;
  timestamp: Date;
}
