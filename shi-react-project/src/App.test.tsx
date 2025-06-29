import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('Проверка роутеров', () => {
  it('при роутере "/" рендерится MainPage', () => {
    render(<MemoryRouter initialEntries={['/']}>{<App />}</MemoryRouter>);
    expect(screen.getByTestId('main-page'))
  });

  it('при роутере"/generator" рендерится GeneratorPage', () => {
    render(<MemoryRouter initialEntries={['/generator']}>{<App />}</MemoryRouter>);
    expect(screen.getByTestId('generator-page'))
  });

  it('при роутере "/history" рендерится HistoryPage', () => {
    render(<MemoryRouter initialEntries={['/history']}>{<App />}</MemoryRouter>);

    expect(screen.getByTestId('history-page'))
  });
});
