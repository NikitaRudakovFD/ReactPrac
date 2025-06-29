import { type FC } from 'react';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import type { HistoryType } from '../../types/types';
import $ from './HistoryList.module.css';
import { ButtonWithText } from '../ButtonWithText/ButtonWithText';

export const HistoryList: FC<HistoryListProps> = (props) => {
  const { history, deleteHistory, deleteAll } = props;

  return (
    <>
      <div className={$.container}>
        {history?.map((item) => (
          <HistoryItem {...item} key={item.id} deleteHistory={deleteHistory} />
        ))}
      </div>
      <div className={$.buttonWrapper}>
        <ButtonWithText
          variant="action"
          handleClick={() => {
            window.location.href = '/generator';
          }}
          title="Сгенерировать больше"
        />
        <ButtonWithText variant="clear" title="Очистить все" handleClick={() => deleteAll()} />
      </div>
    </>
  );
};

export interface HistoryListProps {
  history: HistoryType[] | null;
  deleteHistory: (id: number) => void;
  deleteAll: () => void;
}
