import { type FC } from 'react';
import $ from './ButtonWithIcon.module.css';

export const ButtonWithIcon: FC<ButtonWithIconProps> = (props) => {
  const { icon, handleClick, variant } = props;

  return (
    <button
      className={`${$.button} ${variant === 'white' ? $.white : ''}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <img src={icon}></img>
    </button>
  );
};

export interface ButtonWithIconProps {
  icon: string;
  handleClick: () => void;
  variant?: 'white';
}
