export declare class MachineStatus {
    id: string;
    timestamp: Date;
    state: 'RUNNING' | 'STOPPED' | 'MAINTENANCE' | 'ERROR';
    temperature: number;
    rpm: number;
    uptime: number;
    efficiency: number;
    oeeOverall: number;
    oeeAvailability: number;
    oeePerformance: number;
    oeeQuality: number;
}
