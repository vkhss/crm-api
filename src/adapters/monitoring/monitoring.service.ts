import impConfig from './imp/imp.configuration';
import { ImpFactory } from './imp/imp.factory';
import { IMonitoring, ILogger, ErrorLog, TraceLog } from './imp/imp.interfaces';
import { SeverityLevel } from './imp/severity.level.enum';

export class MonitoringService implements ILogger {
  private adapters: IMonitoring[] = ImpFactory.getInstance();

  private static instance: MonitoringService;

  public static getInstance(): MonitoringService {
    if (!this.instance) {
      this.instance = new MonitoringService();
    }
    return this.instance;
  }

  public startMonitoring() {
    this.adapters.forEach(service => {
      service.init(impConfig);
    });
  }

  public error(data: ErrorLog) {
    this.adapters.forEach(service => {
      service.captureError(
        data.transactionName,
        data.transactionError,
        SeverityLevel.ERROR,
        data.transactionData,
        data.transactionTags
      );
    });
  }

  public fatal(data: ErrorLog) {
    this.adapters.forEach(service => {
      service.captureError(
        data.transactionName,
        data.transactionError,
        SeverityLevel.FATAL,
        data.transactionData,
        data.transactionTags
      );
    });
  }

  public async warn(data: TraceLog) {
    const maskedData = await this.sanatizeObject(
      data.transactionData,
      impConfig.FIELD_MASK
    );
    this.adapters.forEach(service => {
      service.captureTrace(
        data.transactionName,
        SeverityLevel.WARN,
        maskedData,
        data.transactionTags
      );
    });
  }

  public async info(data: TraceLog) {
    const maskedData = await this.sanatizeObject(
      data.transactionData,
      impConfig.FIELD_MASK
    );
    this.adapters.forEach(service => {
      service.captureTrace(
        data.transactionName,
        SeverityLevel.INFO,
        maskedData,
        data.transactionTags
      );
    });
  }

  public async debug(data: TraceLog) {
    const maskedData = await this.sanatizeObject(
      data.transactionData,
      impConfig.FIELD_MASK
    );
    this.adapters.forEach(service => {
      service.captureTrace(
        data.transactionName,
        SeverityLevel.DEBUG,
        maskedData,
        data.transactionTags
      );
    });
  }

  private async sanatizeObject(data: any, fiedsToRemove?: string[]): Promise<any> {
    if (!fiedsToRemove || fiedsToRemove.length === 0) return data;
    const encryptFiels = async (obj: any, fields: string[]): Promise<any> => {
      if (Array.isArray(obj) && obj.length > 1) {
        for (const object of obj) await encryptFiels(object, fields);
      }
      if (typeof obj === 'object') {
        for (const field in obj) {
          if (typeof obj[field] === 'object') await encryptFiels(obj[field], fields);
          if (fields.includes(field)) {
            obj[field] = '[redacted]';
            continue;
          }
        }
      }
      return obj;
    };
    return encryptFiels(data, fiedsToRemove);
  }
}
