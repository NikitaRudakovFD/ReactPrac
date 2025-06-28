import { type FC } from 'react';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import type { History } from '../../types/types';
import $ from './HistoryList.module.css';

export const HistoryList: FC<HistoryListProps> = (props) => {
  const { history, deleteHistory } = props;

  return (
    <div className={$.container}>
      {history?.map((item) => (
        <HistoryItem {...item} key={item.id} deleteHistory={deleteHistory} />
      ))}
    </div>
  );
};

export interface HistoryListProps {
  history: History[] | null;
  deleteHistory: (id: number) => void;
}
