const { formatUptime } = require('../src/utils');

describe('formatUptime', () => {
  test('deve retornar 0s para valores inválidos ou negativos', () => {
    expect(formatUptime(-10)).toBe('0s');
    expect(formatUptime('inválido')).toBe('0s');
    expect(formatUptime(null)).toBe('0s');
    expect(formatUptime(undefined)).toBe('0s');
  });

  test('deve formatar apenas segundos corretamente', () => {
    expect(formatUptime(45)).toBe('45s');
  });

  test('deve formatar minutos e segundos corretamente', () => {
    expect(formatUptime(150)).toBe('2m 30s');
  });

  test('deve formatar horas, minutos e segundos corretamente', () => {
    expect(formatUptime(3750)).toBe('1h 2m 30s');
  });
});
