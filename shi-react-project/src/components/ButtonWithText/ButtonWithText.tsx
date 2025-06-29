import { type FC } from 'react';
import $ from './ButtonWithText.module.css';

export const ButtonWithText: FC<ButtonWithTextProps> = (props) => {
  const { title, variant, disabled, handleClick, } = props;

  return (
    <button
      disabled={disabled}
      className={`${$[variant]} ${$.button}`}
      onClick={() => handleClick()}
       data-testid="buttonWithText"
    >
      {title}
    </button>
  );
};

export interface ButtonWithTextProps {
  title: string;
  variant: 'action' | 'clear' | 'disabled' | 'download';
  handleClick: () => void;
  disabled?: boolean;
}
