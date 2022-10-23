import * as Sentry from '@sentry/node';
import { logger } from '../../instances';

Sentry.init({
  dsn: 'https://b99202efe3da4887a6fd1f837679f26a@o61672.ingest.sentry.io/1478759',
  environment: 'local',
});

const err: Error = new Error('Erro Forçado');

describe('Logging Fatal', () => {
  it('Deverá logar um fatal de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
    const result = logger.fatal({
      transactionName: '[TESTING] FATAL',
      transactionError: err,
      transactionData: {
        response: 'Fatal de teste!',
      },
      transactionTags: { dev: 'Victor Santos' },
    });
    expect(result);
  });
});

describe('Logging Error', () => {
  it('Deverá logar um erro de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
    const result = logger.error({
      transactionName: '[TESTING] ERROR',
      transactionData: {
        response: 'Erro de teste!',
      },
    });
    expect(result);
  });
});

describe('Logging Warn', () => {
  it('Deverá logar um warn de teste nas ferramentas (Sentry, StackDriver)', () => {
    const result = logger.warn({
      transactionName: '[TESTING] WARN',
      transactionData: {
        response: 'WARN de teste',
      },
    });
    expect(result);
  });
});

describe('Logging Info', () => {
  it('Deverá logar um info de teste nas ferramentas (StackDriver)', () => {
    const result = logger.info({
      transactionName: '[TESTING] INFO',
      transactionData: {
        response: 'INFO de teste',
      },
    });
    expect(result);
  });
});

describe('Logging Debug', () => {
  it('Deverá logar um debug de teste nas ferramentas (StackDriver)', () => {
    const result = logger.debug({
      transactionName: '[TESTING] DEBUG',
      transactionData: {
        response: 'INFO de teste',
      },
    });
    expect(result);
  });
});
