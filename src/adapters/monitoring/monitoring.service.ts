import impConfig from './imp/imp.configuration';
import { ImpFactory } from './imp/imp.factory';
import { IMonitoring, ILogger } from './imp/imp.interfaces';

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
    this.adapters.forEach((service) => {
      service.init(impConfig);
    });
  }

  public error(transactionName: string, transactionData: unknown) {
    this.adapters.forEach((service) => {
      service.captureError(transactionName, 'error', transactionData);
    });
  }

  public fatal(transactionName: string, transactionData: unknown) {
    this.adapters.forEach((service) => {
      service.captureError(transactionName, 'fatal', transactionData);
    });
  }

  public async warn(transactionName: string, transactionData: unknown) {
    const maskedData = await this.sanatizeObject(
      transactionData,
      impConfig.FIELD_MASK,
    );
    this.adapters.forEach((service) => {
      service.captureTrace(transactionName, 'warning', maskedData);
    });
  }

  public async info(transactionName: string, transactionData: unknown) {
    const maskedData = await this.sanatizeObject(
      transactionData,
      impConfig.FIELD_MASK,
    );
    this.adapters.forEach((service) => {
      service.captureTrace(transactionName, 'info', maskedData);
    });
  }

  public async debug(transactionName: string, transactionData: unknown) {
    const maskedData = await this.sanatizeObject(
      transactionData,
      impConfig.FIELD_MASK,
    );
    this.adapters.forEach((service) => {
      service.captureTrace(transactionName, 'debug', maskedData);
    });
  }

  private async sanatizeObject(
    data: unknown,
    fiedsToRemove?: string[],
  ): Promise<any> {
    if (!fiedsToRemove || fiedsToRemove.length === 0) return data;
    const encryptFiels = async (obj: any, fields: string[]): Promise<any> => {
      if (Array.isArray(obj) && obj.length > 1) {
        for (const object of obj) await encryptFiels(object, fields);
      }
      if (typeof obj === 'object') {
        for (const field in obj) {
          if (typeof obj[field] === 'object')
            await encryptFiels(obj[field], fields);
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
