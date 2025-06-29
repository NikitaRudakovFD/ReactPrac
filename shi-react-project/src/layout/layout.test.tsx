import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { Layout } from './layout';
import { MemoryRouter } from 'react-router-dom';

describe('Проверка навигации', () => {
  afterEach(() => {
    cleanup();
  });

  test('переводит на /generation при нажатии на  CSV Генератор', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout children={<></>} />
      </MemoryRouter>,
    );
    const generatorLink = getByText('CSV Генератор') as HTMLAnchorElement;
    expect(generatorLink.href).toContain('/generator');
  });

  test('переводит на /history при нажатии на  История', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout children={<></>} />
      </MemoryRouter>,
    );
    const historyLink = getByText('История') as HTMLAnchorElement;
    expect(historyLink.href).toContain('/history');
  });

  test('переводит / при нажатии на CSV Аналитик ', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout children={<></>} />
      </MemoryRouter>,
    );
    const mainLink = getByText('CSV Аналитик') as HTMLAnchorElement;
    expect(mainLink.href).toContain('/');
  });
});
