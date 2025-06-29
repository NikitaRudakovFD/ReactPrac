import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { GalacticList } from './GalacticList';
import type { GalacticStatsType } from '../../types/types';

describe('отображение полученной статистики', () => {
  test('Если данные о статистике пришли, то мы отобразили 8 полей', async () => {
    const statsMock: GalacticStatsType = {
      average_spend_galactic: 0,
      big_spent_at: 0,
      big_spent_civ: 'blobs',
      big_spent_value: 0,
      less_spent_at: 0,
      less_spent_civ: 'blobs',
      less_spent_value: 0,
      rows_affected: 0,
      total_spend_galactic: 0,
    };

    const { getAllByTestId } = render(<GalacticList galacticStats={statsMock} />);

    const item = getAllByTestId('galacticItem');
    expect(item).toHaveLength(8);
  });

  test('если статистика не пришла, то отображаются highLight', () => {
    const statsMock = null;

    const { getAllByTestId } = render(<GalacticList galacticStats={statsMock} />);

    const item = getAllByTestId('highLight');
    expect(item);
  });
});
