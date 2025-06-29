import { type FC } from 'react';
import { type GalacticStatsType } from '../../types/types';
import { GalacticStatsItem } from '../GalacticStatsItem/GalacticStatsItem';
import $ from './GalacticList.module.css';

export const GalacticList: FC<GalacticListProps> = (props) => {
  const { galacticStats, isModal } = props;

  return (
    <>
      {galacticStats ? (
        <div className={isModal ? $.modalContainer : $.container}>
          {Object.entries(galacticStats)
            .filter((stat) => stat[0] !== 'less_spent_value')
            .map((item, index) => (
              <GalacticStatsItem
                stat={item[0] as keyof GalacticStatsType}
                value={item[1]}
                key={index}
                isModal={isModal}
              />
            ))}
        </div>
      ) : (
        <div className={$.highLight} data-testid='highLight'>
          Здесь <br /> появятся хайлайты
        </div>
      )}
    </>
  );
};

export interface GalacticListProps {
  galacticStats: GalacticStatsType | null;
  isModal?: boolean;
}
