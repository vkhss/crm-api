import * as fs from 'fs';

import { MonitoringUtils } from './utils';

describe('Stringify with Max Deeps - Unit Test', () => {
  it('Deve retornar como string quando o tipo de dado é string', () => {
    const result = MonitoringUtils.stringifyObject('test', 1);
    expect(result).toBe('test');
  });

  it('Deve retornar como string quando o tipo de dado é boolean', () => {
    const result = MonitoringUtils.stringifyObject(true, 1);
    expect(result).toBe('true');
  });

  it('Deve retornar como string quando o tipo de dado é number', () => {
    const result = MonitoringUtils.stringifyObject(1, 1);
    expect(result).toBe(1);
  });

  it('Deve retornar como string quando o tipo de dado é bigint', () => {
    const result = MonitoringUtils.stringifyObject(1n, 1);
    expect(result).toBe(1);
  });

  it('Deve retornar como string quando o tipo de dado é symbol', () => {
    const result = MonitoringUtils.stringifyObject(Symbol('test'), 1);
    expect(result).toBe('Symbol(test)');
  });

  it('Deve retornar como string quando o tipo de dado é undefined', () => {
    const result = MonitoringUtils.stringifyObject(undefined, 1);
    expect(result).toBe('undefined');
  });

  it('Deve retornar como string quando o tipo de dado é null', () => {
    const result = MonitoringUtils.stringifyObject(null, 1);
    expect(result).toBe('null');
  });

  it('Deve retornar como string quando o tipo de dado é function', () => {
    const result = MonitoringUtils.stringifyObject(() => {}, 1);
    expect(result).toBe('() => { }');
  });

  it('Deve retornar como string quando o tipo de dado é array', () => {
    const result = MonitoringUtils.stringifyObject(['test'], 1);
    expect(result).toBe('["test"]');
  });

  it('Deve retornar como string quando o tipo de dado é object', () => {
    const result = MonitoringUtils.stringifyObject({ test: 'test' }, 1);
    expect(result).toBe('{"test":"test"}');
  });

  it.each([
    { sutObject: { test: 'valor' }, expected: '[object]' },
    {
      sutObject: [{ test: 'valor' }, { item: 'six' }],
      expected: '["[object]","[object]"]',
    },
  ])(
    'Deve retornar object quando o tipo de dado é object ou array e o maxDeep 0',
    ({ sutObject, expected }) => {
      const result = MonitoringUtils.stringifyObject(sutObject, 0);
      expect(result).toBe(expected);
    },
  );

  it('broken code when is 0', () => {
    const result = MonitoringUtils.stringifyObject('valor', 0);
    expect(result).toBe('valor');
  });

  it.each([
    {
      deep: 1,
      sutObject: {
        valor: 1,
        aninhado: {
          outro: 'valor',
        },
      },
      expected: '{"valor":1,"aninhado":"[object]"}',
    },
    {
      deep: 2,
      sutObject: {
        valor: 1,
        aninhado: {
          outro: 'valor',
        },
        aninhadinho: {
          outro: 'valor 2',
          aninhado2: {
            outro: 'valor 3',
            aninhado3: {
              outro: 'valor 4',
            },
          },
        },
      },
      expected:
        '{"valor":1,"aninhado":{"outro":"valor"},"aninhadinho":{"outro":"valor 2","aninhado2":"[object]"}}',
    },
    {
      deep: 2,
      sutObject: [
        {
          valor: 1,
          aninhado: {
            outro: 'valor',
          },
          aninhadinho: {
            outro: 'valor 2',
            aninhado2: {
              outro: 'valor 3',
              aninhado3: {
                outro: 'valor 4',
              },
            },
          },
        },
        {
          valor: 1,
          aninhado: {
            outro: 'valor',
          },
          aninhadinho: {
            outro: 'valor 2',
            aninhado2: {
              outro: 'valor 3',
              aninhado3: {
                outro: 'valor 4',
              },
            },
          },
        },
      ],
      expected:
        '[{"valor":1,"aninhado":{"outro":"valor"},"aninhadinho":{"outro":"valor 2","aninhado2":"[object]"}},{"valor":1,"aninhado":{"outro":"valor"},"aninhadinho":{"outro":"valor 2","aninhado2":"[object]"}}]',
    },
  ])('object deep', ({ deep, sutObject, expected }) => {
    const result = MonitoringUtils.stringifyObject(sutObject, deep);

    expect(result).toBe(expected);
  });

  it('dependency cycle', () => {
    const objA: Record<string, unknown> = {
      valor: 'unitário',
      objB: null,
    };

    const objB = {
      segundo: 'teste',
      objA,
    };

    objA.objB = objB;

    const result = MonitoringUtils.stringifyObject(objA, 5);

    fs.writeFileSync('teste.json', result);
    expect(result).toBe(
      '{"valor":"unitário","objB":{"segundo":"teste","objA":{"valor":"unitário","objB":{"segundo":"teste","objA":{"valor":"unitário","objB":"[object]"}}}}}',
    );
  });
});
