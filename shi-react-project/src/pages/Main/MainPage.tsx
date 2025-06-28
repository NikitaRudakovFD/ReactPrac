import { useCallback } from 'react';
import { LoadFileArea } from '../../components/LoadFileArea/LoadFileArea';
import { useGalacticStatsStore } from '../../store/GalacticStatsStore';
import $ from './MainPage.module.css';
import { GalacticList } from '../../components/GalacticList/GalacticList';

export const Main = () => {
  const stats = useGalacticStatsStore((state) => state.stats);
  const addStats = useGalacticStatsStore((state) => state.addStats);

  const handleFormSubmit = useCallback(
    async (file: File | undefined) => {
      await addStats(file);
    },
    [addStats],
  );

  return (
    <>
      <div className={$.container}>
        <div className={$.loadAreaContainer}>
          <h2 className={$.title}>
            Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за сверхнизкое время
          </h2>
          <LoadFileArea handleFormSubmit={handleFormSubmit} />
        </div>
        {stats ? (
          <GalacticList galacticStats={stats} />
        ) : (
          <div className={$.highLight}>
            Здесь <br /> появятся хайлайты
          </div>
        )}
      </div>
    </>
  );
};
