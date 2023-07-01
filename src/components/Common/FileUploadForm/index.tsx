import SelectFilesToUploadButton from '../SelectFilesToUploadButton';
import {useTranslation} from 'react-i18next';
import {useState, DragEvent} from 'react';

import s from './styles.module.css';
import {Typography} from 'fronton-react';

interface Props {
    onFileSelect: (file: File | undefined) => void;
}

const FileUploadForm: React.FC<Props> = ({onFileSelect}) => {
    const {t} = useTranslation('files');

    const [drag, setDrag] = useState<boolean>(false);

    const [file, setFile] = useState<File>();

    const handleFileSelect = (file: File | undefined) => {
        onFileSelect(file);
        setFile(file);
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        handleFilesSelect(e.dataTransfer.files);
        setDrag(false);
    };

    const handleFilesSelect = (files: FileList) => {
        if (!files.length) return;
        handleFileSelect(files[0]);
    };

    if (drag) {
        return (
            <div className={s.root} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragOver={handleDragStart}>
                {t('Drop')}
            </div>
        );
    }

    if (file) {
        return (
            <div className={s.root}>
                {file.name}
                <button onClick={() => handleFileSelect(undefined)}>Выбрать другой файл</button>
            </div>
        );
    }

    return (
        <div className={s.root} onDragStart={handleDragStart} onDragOver={handleDragStart}>
            <br />
            <Typography variant="l" size="body_accent">
                {t('Title')}
            </Typography>
            <SelectFilesToUploadButton onFilesSelect={handleFilesSelect} />
            <div>
                <Typography variant="s" size="body_short">
                    {t('Format')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {t('Size')}
                </Typography>
            </div>
            <br />
        </div>
    );
};

export default FileUploadForm;
