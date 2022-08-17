import * as Sentry from '@sentry/node';

class SentryService {
    public Init(): void {
        try {
            Sentry.init({
                dsn: process.env.SENTRY_DNS,
                tracesSampleRate: 1.0,
            });
            console.log('Sentry Started!')
        } catch (error) {
            console.log(error)
        }
    }

    public RequestHandler(): any {
        try {
            return Sentry.Handlers.requestHandler()
        } catch (error) {
            console.log(error)

        }
    }

    public ErrorHandler(): any {
        try {
            return Sentry.Handlers.errorHandler()
        } catch (error) {
            console.log(error)

        }
    }
}

export { SentryService }

