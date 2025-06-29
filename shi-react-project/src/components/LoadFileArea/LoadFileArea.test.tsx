import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { LoadFileArea } from './LoadFileArea';
import events from '@testing-library/user-event';

describe('поле загрузки файла', () => {
  afterEach(() => {
    cleanup();
  });
  test('если не добавлен файл, то кнопка "Отправить" задизейблена', () => {
    const mockSubmit = vi.fn();
    const { getByTestId } = render(<LoadFileArea handleFormSubmit={mockSubmit} />);
    //проверяемое поведение
    const button = getByTestId('buttonWithText');
    const result = button.hasAttribute('disabled');
    expect(result).toBe(true);
  });

  test('если добавить файл, то кнопка "Отправить" будет доступна', async () => {
    const mockSubmit = vi.fn();
    const { getByTestId } = render(<LoadFileArea handleFormSubmit={mockSubmit} />);

    const file = new File(['hello'], 'hello.csv', { type: './csv' });

    const input = getByTestId('inputFile');
    await events.upload(input, file);

    const button = getByTestId('buttonWithText');
    const result = button.hasAttribute('disabled');
    expect(result).toBe(false);
  });

  test('если добавить 2 файла, то добавиться только 1', async () => {
    const mockSubmit = vi.fn();
    const { getByTestId } = render(<LoadFileArea handleFormSubmit={mockSubmit} />);
    const files = [
      new File(['hello'], 'hello.csv', { type: './csv' }),
      new File(['hello1'], 'hello.csv', { type: './csv' }),
    ];

    const input = getByTestId('inputFile') as HTMLInputElement;
    await events.upload(input, files);

    expect(input.files).toHaveLength(1);
  });

	test('если добавить файл не того типа, то он не добавиться', async ()=> {
		const mockSubmit = vi.fn();
    const { getByTestId } = render(<LoadFileArea handleFormSubmit={mockSubmit} />);
    const file =  new File(['hello'], 'hello.png', { type: './png' })
    

    const input = getByTestId('inputFile') as HTMLInputElement;
     events.upload(input, file);

    expect(input.files).toHaveLength(0);
	})

  test('если запрос в pending, то отобразится Loader', async () => {
    //Подготовка
    const mockSubmit = vi.fn(() => new Promise<void>((resolve) => setTimeout(resolve, 100)));
    const { getByTestId } = render(<LoadFileArea handleFormSubmit={mockSubmit} />);
    const file = new File(['hello'], 'hello.csv', { type: './csv' });
    const input = getByTestId('inputFile');

    // Проверка
    await events.upload(input, file);
    const button = getByTestId('buttonWithText');
    await events.click(button);
    const loader = getByTestId('loader');
    expect(loader);
  });

  test('если запрос прошел, то появится текст "готово!', async () => {
    const mockSubmit = vi.fn().mockResolvedValue('test');
    const { getByTestId } = render(<LoadFileArea handleFormSubmit={mockSubmit} />);
    const file = new File(['hello'], 'hello.csv', { type: './csv' });
    const input = getByTestId('inputFile');

    await events.upload(input, file);
    const button = getByTestId('buttonWithText');
    await events.click(button);

    expect(getByTestId('fileStatusDescr').textContent).toEqual('готово!');
  });
});
