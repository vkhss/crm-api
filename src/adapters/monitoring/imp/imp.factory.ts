import { ElasticAPMService } from './elastic/elastic.adapter';
import { IMonitoring } from './imp.interfaces';
import { SentryService } from './sentry/sentry.adapter';
import { StackDriverService } from './stack-driver/stack-driver.adapter';

export class ImpFactory {
  private static instances: IMonitoring[];

  public static getInstance(): IMonitoring[] {
    if (!this.instances) {
      this.instances = [
        new SentryService(),
        new ElasticAPMService(),
        new StackDriverService(),
      ];
    }
    return this.instances;
  }
}
