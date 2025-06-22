import { useState, type FC } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import $ from './HistoryItem.module.css';
import FileIcon from '../../assets/icons/fileIcon.svg';
import TrashIcon from '../../assets/icons/Trash.svg';
import SmileIcon from '../../assets/Icons/smileIcon.svg';
import SadIcon from '../../assets/Icons/sadSmileIcon.svg';
import { Modal } from '../Modal/Modal';
import { GalacticList } from '../GalacticList/GalacticList';
import type { GalacticStatsType } from '../../types/types';

export const HistoryItem: FC<HistoryItemProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fileName, date, status, id, deleteHistory, stats } = props;
  return (
    <>
      {' '}
      <div className={$.container}>
        <div
          className={$.contentWrapper}
          onClick={() => {
            if (status && stats) {
              setIsOpen(true);
            }
          }}
        >
          <div className={$.contentWithIcon}>
            <img src={FileIcon} style={{ marginRight: 5 }} />
            <span>{fileName.length > 15 ? `${fileName.slice(0, 10)}...` : fileName}</span>
          </div>
          <span>{date}</span>
          <div className={`${$.contentWithIcon} ${status ? '' : $.disabled}`}>
            <span style={{ marginRight: 5 }}>Обработан успешно</span>
            <img src={SmileIcon} />
          </div>
          <div className={`${$.contentWithIcon} ${status ? $.disabled : ''}`}>
            <span style={{ marginRight: 5 }}>Не удалось обработать</span>
            <img src={SadIcon} />
          </div>
        </div>
        <ButtonWithIcon variant="white" icon={TrashIcon} handleClick={() => deleteHistory(id)} />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {' '}
        <GalacticList galacticStats={stats!} isModal={true} />
      </Modal>
    </>
  );
};

export interface HistoryItemProps {
  fileName: string;
  date: string;
  status: boolean;
  id: number;
  stats: GalacticStatsType | null;

  deleteHistory: (id: number) => void;
}
