import { type FC } from 'react';
import $ from './Loader.module.css';

export const Loader: FC<LoaderProps> = ({ loadStatus }) => {
  if (loadStatus !== 'pending') return null;

  return <div data-testid="loader" className={$.loader}></div>;
};

interface LoaderProps {
  loadStatus: 'pending' | string;
}
