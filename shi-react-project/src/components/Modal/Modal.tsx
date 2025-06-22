import { createPortal } from 'react-dom';
import $ from './Modal.module.css';
import type { FC, ReactNode } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon';
import CancelIcon from '../../assets/icons/cancelIcon.svg';

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={$.modalOverlay} onClick={() => onClose()}>
      <div className={$.modalContainer}>
        <div className={$.modalButton}>
          <ButtonWithIcon icon={CancelIcon} handleClick={() => onClose()} />{' '}
        </div>
        <div className={$.modalContent}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
