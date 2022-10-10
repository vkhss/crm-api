export default {
  INIT_ELASTIC: !!process.env.ELASTIC_APM_SERVER_URL,
  INIT_SENTRY: !!process.env.SENTRY_DSN,
  FIELD_MASK: ['email', 'password', 'name', 'token', 'cpf'],
};
