export type GalacticStatsType = {
  average_spend_galactic: number;
  big_spent_at: number;
  big_spent_civ: CivilizationType;
  big_spent_value: number;
  less_spent_at: number;
  less_spent_civ: CivilizationType;
  less_spent_value: number;
  rows_affected: number;
  total_spend_galactic: number;
};

export type CivilizationType = 'monsters' | 'humans' | 'blobs';

export enum GalacticDescrByKey {
  total_spend_galactic = 'общие расходы в галактических кредитах',
  rows_affected = 'количество обработанных записей',
  less_spent_civ = 'цивилизация с минимальными расходами',
  big_spent_value = 'максимальная сумма расходов за день',
  big_spent_civ = 'цивилизация с максимальными расходами',
  big_spent_at = 'день года с максимальными расходами',
  average_spend_galactic = 'средние расходы в галактических кредитах',
  less_spent_at = 'день года с минимальными расходами',
  less_spent_value = '',
}

export interface History {
  fileName: string;
  status: boolean;
  date: string;
  stats: GalacticStatsType | null;
  id: number;
}
