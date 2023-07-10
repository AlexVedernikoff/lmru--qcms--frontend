import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {useRef} from 'react';
import UploadIcon from '../../Icons/UploadIcon';

import s from './styles.module.css';

interface Props {
    onFilesSelect: (files: FileList) => void;
}

const SelectFilesToUploadButton: React.FC<Props> = ({onFilesSelect}) => {
    const {t} = useTranslation('files');

    const refInput = useRef<HTMLInputElement>(null);

    const handleFilesSelect = (event: {target: {files: FileList | null}}) => {
        const {files} = event.target;
        if (files) {
            onFilesSelect(files);
        }
    };

    const handleButtonClick = () => {
        refInput.current?.click();
    };

    return (
        <RegularButton
            size="l"
            variant="primary"
            iconLeft={<UploadIcon type="outline" />}
            className={s.button}
            onClick={handleButtonClick}
        >
            <input ref={refInput} className={s.input} type="file" onChange={handleFilesSelect} accept=".xls, .csv" />
            {t('Button')}
        </RegularButton>
    );
};

export default SelectFilesToUploadButton;
