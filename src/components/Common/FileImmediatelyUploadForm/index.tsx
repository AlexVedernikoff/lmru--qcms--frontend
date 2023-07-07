import {ICreateDocumentResponse, IDocumentMetadata} from '../../../common/types/createDocument';
import FileUploadForm from '../FileUploadForm';
import {useEffect} from 'react';
import {Loader} from 'fronton-react';
import api from './api';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import s from './styles.module.css';

interface Props {
    documentMetadata: IDocumentMetadata;
    onError: (error: FetchBaseQueryError | SerializedError) => void;
    onSuccess: (createDocumentResponse: ICreateDocumentResponse) => void;
}

const FileImmediatelyUploadForm: React.FC<Props> = ({documentMetadata, onError, onSuccess}) => {
    const [createDocument, createDocumentRequestState] = api.useCreateDocumentMutation();

    useEffect(() => {
        if (createDocumentRequestState.isUninitialized) return;
        if (createDocumentRequestState.isError) {
            onError(createDocumentRequestState.error);
        }
        if (createDocumentRequestState.isSuccess) {
            onSuccess(createDocumentRequestState.data);
        }
        createDocumentRequestState.reset();
    }, [createDocumentRequestState, onError, onSuccess]);

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

    if (createDocumentRequestState.isLoading) {
        return (
            <div className={s.root}>
                <Loader />
            </div>
        );
    }

    return <FileUploadForm onFileSelect={handleFileSelect} />;
};

export default FileImmediatelyUploadForm;
