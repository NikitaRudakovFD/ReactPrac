import { HistoryList } from '../../components/HistoryList/HistoryList';
import { useGalacticStatsStore } from '../../store/GalacticStatsStore';
import $ from './HistoryPage.module.css';

export const HistoryPage = () => {
  const history = useGalacticStatsStore((state) => state.history);
  const deleteHistory = useGalacticStatsStore((state) => state.deleteHistory);
  const deleteAll = useGalacticStatsStore((state) => state.deleteAllHistory);

  return (
    <div className={$.container} data-testid="history-page">
      <HistoryList history={history} deleteHistory={deleteHistory} deleteAll={deleteAll} />
    </div>
  );
};
