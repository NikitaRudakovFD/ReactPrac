import { useCallback, useState } from 'react';
import { ButtonWithText } from '../../components/ButtonWithText/ButtonWithText';
import { parseCsvService } from '../../services/parseCsv.service';
import $ from './GeneratorPage.module.css';
import { Input } from '../../components/Input/Input';

export const GeneratorPage = () => {
  const [generationStatus, setGenerationStatus] = useState<
    'errorCreate' | 'pending' | 'doneCreate' | 'default'
  >('default');

  const handleClick = useCallback(async () => {
    setGenerationStatus('pending');

    try {
      await parseCsvService.createCsv();
      setGenerationStatus('doneCreate');
    } catch (error) {
      setGenerationStatus('errorCreate');
      throw new Error(`Ошибка при генерации ${error}`);
    }
  }, []);

  return (
    <>
      <div className={$.container}>
        <h2 className={$.title}>Сгенерируйте готовый csv-файл нажатием одной кнопки</h2>
        {generationStatus === 'default' && (
          <ButtonWithText
            title="Начать генерацию"
            variant="action"
            handleClick={() => handleClick()}
          />
        )}
        {generationStatus !== 'default' && (
          <Input
            title={generationStatus === 'doneCreate' ? 'Done' : 'Ошибка'}
            handleFileSet={() => {
              setGenerationStatus('default');
            }}
            status={generationStatus}
          />
        )}
      </div>
    </>
  );
};
