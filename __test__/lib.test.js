import { formatDate } from '../lib/utils'
import { calculateTotal } from '../lib/utils'
import { groupTransactionsByDate } from '../lib/utils'

test('formatea correctamente las fechas en es-CO', () => {
  expect(formatDate('2025-03-30')).toBe('30 de mar de 2025');
  expect(formatDate('2025-03-31')).toBe('31 de mar de 2025');
  expect(formatDate('2025-04-01')).toBe('01 de abr de 2025');
});

describe('calculateTotal', () => {
  test('calcula el total correctamente con ingresos y gastos', () => {
    const movimientos = [
      { type: 'INCOME', amount: 1000 },
      { type: 'EXPENSE', amount: 500 },
    ];
    expect(calculateTotal(movimientos)).toBe(500);
  });

  test('devuelve 0 si no hay movimientos', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('devuelve un número negativo si hay más gastos que ingresos', () => {
    const movimientos = [
      { type: 'INCOME', amount: 500 },
      { type: 'EXPENSE', amount: 1000 },
    ];
    expect(calculateTotal(movimientos)).toBe(-500);
  });
});

describe('groupTransactionsByDate', () => {
  test('agrupa correctamente las transacciones por fecha', () => {
    const transactions = [
      { date: '2025-03-01', type: 'INCOME', amount: 1000 },
      { date: '2025-03-01', type: 'EXPENSE', amount: 500 },
      { date: '2025-03-02', type: 'INCOME', amount: 2000 },
    ];

    const result = groupTransactionsByDate(transactions);

    expect(result).toEqual({
      '2025-03-01': { income: 1000, expense: 500 },
      '2025-03-02': { income: 2000, expense: 0 },
    });
  });

  test('maneja una lista vacía correctamente', () => {
    expect(groupTransactionsByDate([])).toEqual({});
  });

  test('funciona correctamente con solo ingresos', () => {
    const transactions = [
      { date: '2025-03-01', type: 'INCOME', amount: 1000 },
    ];

    expect(groupTransactionsByDate(transactions)).toEqual({
      '2025-03-01': { income: 1000, expense: 0 },
    });
  });

  test('funciona correctamente con solo gastos', () => {
    const transactions = [
      { date: '2025-03-01', type: 'EXPENSE', amount: 500 },
    ];

    expect(groupTransactionsByDate(transactions)).toEqual({
      '2025-03-01': { income: 0, expense: 500 },
    });
  });
});