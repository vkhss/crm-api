import * as apm from 'elastic-apm-node';

import { logger } from '../../instances';

apm.start();

describe('Start Monitoring', () => {
  it('Deverá iniciar os serviões de monitoria Sentry', () => {
    const result = logger.startMonitoring();
    expect(result);
  });
});

describe('Logging Error', () => {
  it('Deverá logar um erro de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
    const result = logger.error('[TESTING] Error', {
      response: 'Erro de teste!',
    });
    expect(result);
  });
});

describe('Logging Warn', () => {
  it('Deverá logar um warn de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
    const result = logger.warn('[TESTING] Warn', {
      response: 'Warn de teste',
    });
    expect(result);
  });
});

describe('Logging Fatal', () => {
  it('Deverá logar um fatal de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
    const result = logger.fatal('[TESTING] Fatal', {
      response: 'Fatal de teste',
    });
    expect(result);
  });
});

describe('Logging Info', () => {
  it('Deverá logar um info de teste nas ferramentas (StackDriver)', () => {
    const result = logger.info('[TESTING] Info', {
      response: 'Info de teste',
    });
    expect(result);
  });
});

describe('Logging Debug', () => {
  it('Deverá logar um debug de teste nas ferramentas (StackDriver)', () => {
    const result = logger.debug('Debug teste!', {
      response: 'Debug de teste',
    });
    expect(result);
  });
});
