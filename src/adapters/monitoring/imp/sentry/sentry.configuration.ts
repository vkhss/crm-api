export default {
    "dsn": process.env.SENTRY_DSN,
    "debug": process.env.SENTRY_ENVIRONMENT !== 'production' ? true : false,
    "environment": process.env.SENTRY_ENVIRONMENT,
    "release": process.env.SENTRY_RELEASE,
  };
  
  