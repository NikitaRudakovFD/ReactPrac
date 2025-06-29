import { afterEach, describe, expect, test, vi } from 'vitest';
import { HistoryList } from './HistoryList';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('проверка историй', () => {
  afterEach(() => {
    cleanup();
  });
  test('если история пришла, мы ее отображаем', () => {
    const statsMock = {
      fileName: 'test',

      status: false,
      date: '123',
      stats: null,
      id: 123,
    };
    const { getAllByTestId } = render(
      <HistoryList history={[statsMock]} deleteHistory={vi.fn()} deleteAll={vi.fn()} />,
    );
    const items = getAllByTestId('historyItem');

    expect(items).toHaveLength(1);
  });

  test('вызывает метод для удаления одной истории при клике', async () => {
    const mockDelete = vi.fn();
    const statsMock = {
      fileName: 'test',

      status: false,
      date: '123',
      stats: null,
      id: 123,
    };

    render(<HistoryList history={[statsMock]} deleteHistory={mockDelete} deleteAll={vi.fn()} />);

    await userEvent.click(screen.getByTestId('deleteButton'));
    expect(mockDelete).toHaveBeenCalledWith(123);
  });

  test('вызываетcя метод для удаления всех историй при клике', async () => {
    const mockDeleteAll = vi.fn();
    const statsMock = {
      fileName: 'test',

      status: false,
      date: '123',
      stats: null,
      id: 123,
    };

    render(<HistoryList history={[statsMock]} deleteHistory={vi.fn()} deleteAll={mockDeleteAll} />);

    await userEvent.click(screen.getByText('Очистить все'));
    expect(mockDeleteAll).toHaveBeenCalled();
  });
});
