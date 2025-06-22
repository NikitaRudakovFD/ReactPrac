import { Link } from 'react-router-dom';
import { ButtonWithText } from '../../components/ButtonWithText/ButtonWithText';
import { HistoryList } from '../../components/HistoryList/HistoryList';
import { useGalacticStatsStore } from '../../store/GalacticStatsStore';
import $ from './HistoryPage.module.css';

export const HistoryPage = () => {
  const history = useGalacticStatsStore((state) => state.history);
  const deleteHistory = useGalacticStatsStore((state) => state.deleteHistory);
  const deleteAll = useGalacticStatsStore((state) => state.deleteAllHistory);

  return (
    <div className={$.container}>
      <HistoryList history={history} deleteHistory={deleteHistory} />
      <div className={$.buttonWrapper}>
        <Link to={'/generator'}>
          <ButtonWithText variant="action" handleClick={() => {}} title="Сгенерировать больше" />
        </Link>
        <ButtonWithText variant="clear" title="Очистить все" handleClick={() => deleteAll()} />
      </div>
    </div>
  );
};
