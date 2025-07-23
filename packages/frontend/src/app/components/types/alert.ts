export interface Alert {
  id: string;
  level: "INFO" | "AVISO" | "CRÍTICO";
  message: string;
  component: string;
  timestamp: Date;
  acknowledged: boolean;
}
