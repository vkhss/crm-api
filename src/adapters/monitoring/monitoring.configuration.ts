export default {
    'INIT_ELASTIC': process.env.ELASTIC_APM_SERVER_URL ? true : false,
    'INIT_SENTRY': process.env.SENTRY_DSN ? true : false,
    'FIELD_MASK': [
        'email',
        'password',
        'name',
        'token'
    ],
    'BLOCK_STATUS': [401, 422]
}