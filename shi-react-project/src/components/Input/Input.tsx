import { type FC } from 'react';
import $ from './Input.module.css';
import CancelIcon from '../../assets/icons/cancelIcon.svg';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import { Loader } from '../Loader/Loader';

export const Input: FC<InputProps> = (props) => {
  const { handleFileSet, title = 'Загрузить файл', status = 'default' } = props;

  const descrByStatus: DescrByStatusType = {
    'default': 'или перетащите сюда',
    'uploaded': 'файл загружен!',
    'error': 'упс, не то...',
    'pending': 'идет парсинг файла',
    'done': 'готово!',
    'doneCreate': 'файл сгенерирован!',
    'errorCreate': 'упс, не то...',
  };

  return (
    <div className={$.defaultWrapper}>
      <div className={$.labelWrapper}>
        <label className={`${$.label} ${$[status]}`} >
          {status !== 'pending' ? title : <Loader loadStatus={status} />}
          <input
            disabled={['doneCreate', 'errorCreate'].includes(status)}
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (!e.target.files?.[0]) return;
              handleFileSet(e.target.files?.[0]);
            }}
           data-testid='inputFile'
          />
        </label>

        {status !== 'default' && status !== 'pending' && (
          <ButtonWithIcon
            icon={CancelIcon}
            handleClick={() => {
              handleFileSet(undefined);
            }}
          />
        )}
      </div>
      <span data-testid='fileStatusDescr' className={status === 'error' || status === 'errorCreate' ? `${$.errorDescr}` : ''}>
        {descrByStatus[status]}
      </span>
    </div>
  );
};

interface InputProps {
  handleFileSet: (file: File | undefined) => void;
  status: 'error' | 'uploaded' | 'default' | 'pending' | 'done' | 'doneCreate' | 'errorCreate';
  title?: string;
}

type DescrByStatusType = {
  [key in InputProps['status']]: string;
};
