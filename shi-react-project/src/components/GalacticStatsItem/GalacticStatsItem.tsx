import { type FC } from 'react';
import {
  GalacticDescrByKey,
  type CivilizationType,
  type GalacticStatsType,
} from '../../types/types';
import $ from './GalacticStatsItem.module.css';

export const GalacticStatsItem: FC<GalacticStatsItemProps> = (props) => {
  const { value, stat, isModal } = props;

  return (
    <>
      <div className={isModal ? $.modalContainer : $.container}>
        <span className={$.count}>{typeof value === 'number' ? Math.floor(value) : value}</span>
        <span className={$.descr}>{GalacticDescrByKey[stat]}</span>
      </div>
    </>
  );
};

export interface GalacticStatsItemProps {
  value: number | CivilizationType;
  stat: keyof GalacticStatsType;
  isModal?: boolean;
}
