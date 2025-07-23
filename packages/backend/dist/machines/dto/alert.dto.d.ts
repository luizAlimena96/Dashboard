export interface AlertDto {
    id: string;
    level: 'INFO' | 'WARNING' | 'CRITICAL';
    message: string;
    timestamp: Date;
}
