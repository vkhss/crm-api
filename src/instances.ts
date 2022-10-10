import { MonitoringService } from './adapters/monitoring/monitoring.service';

export const logger: MonitoringService = MonitoringService.getInstance();
