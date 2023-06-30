import {IDocumentMetadata} from '../../../common/types/createDocument';
import FileUploadForm from '../FileUploadForm';
import {useEffect} from 'react';
import {Loader} from 'fronton-react';
import api from './api';

import s from './styles.module.css';

interface Props {
    documentMetadata: IDocumentMetadata;
}

const FileImmediatelyUploadForm: React.FC<Props> = ({documentMetadata}) => {
    const [createDocument, {isLoading, isSuccess, isError}] = api.useCreateDocumentMutation();

    useEffect(() => {
        if (isError) {
            alert('Не удалось загрузить файл. Повторите попытку позже.');
        }
        if (isSuccess) {
            alert('Файл успешно загружен!');
        }
    }, [isSuccess, isError]);

    const handleFileSelect = (file?: File) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file1', file);

        formData.append('documentMetaData', JSON.stringify(documentMetadata));

        createDocument({
            body: formData,
            header: {
                securityCode: 'security_code',
            },
        });
    };

    if (isLoading) {
        return (
            <div className={s.root}>
                <Loader />
            </div>
        );
    }

    return <FileUploadForm onFileSelect={handleFileSelect} />;
};

export default FileImmediatelyUploadForm;
