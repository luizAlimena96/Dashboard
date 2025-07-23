export class MachineResponseDto {
    machineId: string;
    name: string;
    status: string;
    lastMaintenance?: Date;
    nextMaintenance?: Date;
  }