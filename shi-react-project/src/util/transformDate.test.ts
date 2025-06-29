import { describe, expect, it } from 'vitest';
import { transformDate } from './transformDate';

describe('Проверка даты', () => {
  it('число изменится с 0 на "1 января"', () => {
    expect(transformDate(0)).toBe('1 января');
  });

  it('число изменится с 30 на "31 января"', () => {
    expect(transformDate(30)).toBe('31 января');
  });

  it('число изменится с 31 на "1 февраля"', () => {
    expect(transformDate(31)).toBe('1 февраля');
  });

  it('число изменится с 59 на "29 февраля"', () => {
    expect(transformDate(59)).toBe('29 февраля');
  });

  it('число изменится с 60 на "1 марта"', () => {
    expect(transformDate(60)).toBe('1 марта');
  });

  it('число изменится с 364 на "30 декабря"', () => {
    expect(transformDate(364)).toBe('30 декабря');
  });

  it('число изменится с 365 на "31 декабря"', () => {
    expect(transformDate(365)).toBe('31 декабря');
  });

  it('число изменится с 366 на "1 января"', () => {
    expect(transformDate(366)).toBe('1 января');
  });
});
