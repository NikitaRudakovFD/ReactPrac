import { useRef, useState, type DragEvent, type FC } from 'react';
import $ from './LoadFileArea.module.css';
import { Input } from '../Input/Input';
import { ButtonWithText } from '../ButtonWithText/ButtonWithText';

export const LoadFileArea: FC<LoadFileAreaProps> = (props) => {
  const { handleFormSubmit } = props;
  const [file, setFile] = useState<File>();
  const [dragActive, setDragActive] = useState(false);
  const [formStatus, setFormStatus] = useState<formStatusType>('default');
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileSet = (file: File | undefined) => {
    setFile(file);
    setFormStatus(file ? (file?.type === 'text/csv' ? 'uploaded' : 'error') : 'default');
  };

  const handleDrag = (e: DragEvent<HTMLFormElement>, dragStatus: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    if (dragStatus === dragActive) return;

    if (!dragStatus) {
      if (!formRef.current?.contains(e.relatedTarget as Node)) {
        setDragActive(false);
      }
    } else {
      setDragActive(dragStatus);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        className={`${$.form} ${dragActive ? $.drag : ''}`}
        onDragEnter={(e) => handleDrag(e, true)}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={(e) => {
          if (!e.dataTransfer.files[0]) return;
          e.preventDefault();
          setDragActive(false);
          handleFileSet(e.dataTransfer.files?.[0]);
        }}
      >
        <Input handleFileSet={handleFileSet} title={file?.name} status={formStatus}  />
      </form>

      {formStatus !== 'pending' && formStatus !== 'done' && (
        <ButtonWithText
          title="Отправить"
          variant={file === undefined ? 'disabled' : 'action'}
          disabled={file === undefined}
          handleClick={async () => {
            setFormStatus('pending');
            try {
              await handleFormSubmit(file);
              setFormStatus('done');
            } catch (error) {
              setFormStatus('error');
              throw new Error(`Ошибка при попытке парсинга ${error}`);
            }
          }}
        />
      )}
    </>
  );
};

interface LoadFileAreaProps {
  handleFormSubmit: (file: File | undefined) => Promise<void>;
}

type formStatusType = 'error' | 'uploaded' | 'default' | 'pending' | 'done';
