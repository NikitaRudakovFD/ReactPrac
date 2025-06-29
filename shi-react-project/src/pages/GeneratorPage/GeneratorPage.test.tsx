import { describe, expect, test } from 'vitest';
import { GeneratorPage } from './GeneratorPage';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';

describe('проверка страница генерации', () => {
  test('если запрос в pending, то отобразится Loader', async () => {
    //Подготовка
    const { getByTestId } = render(<GeneratorPage />);

    // Проверка
    const button = getByTestId('buttonWithText');
    await events.click(button);
    const loader = getByTestId('loader');
    expect(loader);
  });
});
