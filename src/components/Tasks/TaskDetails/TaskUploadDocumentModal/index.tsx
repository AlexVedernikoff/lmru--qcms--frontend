import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DatePicker, Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import tasksApi from '../../tasksApi';
import FileUploadForm from '../../../Common/FileUploadForm';
import {IDocumentMetaData} from '../../../../common/types/files';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import {ITaskDetails} from '../../../../common/types/taskDetails';
import {notification} from 'antd';

import styles from './styles.module.css';

export interface Props {
    show: boolean;
    onClose: () => void;
    taskDetails: ITaskDetails;
}

interface FormState {
    isPartial: boolean;
    startDate?: string;
    endDate?: string;
    file?: File;
}

const initialFormState: FormState = {
    isPartial: false,
};

const TaskUploadDocumentModal: React.FC<Props> = ({show, onClose}) => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const {t} = useTranslation('tasks');

    const [formState, setFormState] = useState<FormState>(initialFormState);

    const [createDocument, createDocumentResult] = tasksApi.endpoints.createDocument.useMutation();

    const isButtonDisabled = useMemo(
        () =>
            createDocumentResult.isLoading ||
            !formState.file ||
            (formState.isPartial ? !formState.startDate : !formState.startDate || !formState.endDate),
        [createDocumentResult.isLoading, formState]
    );

    const handleClose = useCallback(() => {
        if (createDocumentResult.isLoading) return;
        onClose();
        setFormState(initialFormState);
    }, [createDocumentResult.isLoading, onClose]);

    useEffect(() => {
        if (!formState.file) return;

        if (createDocumentResult.isSuccess) {
            handleClose();
        }

        if (createDocumentResult.isError) {
            type TDataError = {data: {errors: [{message: string}]}};
            notificationApi.open({
                message: (createDocumentResult.error as unknown as TDataError)?.data?.errors?.[0]?.message,
            });
        }
    }, [
        createDocumentResult.error,
        createDocumentResult.isError,
        createDocumentResult.isSuccess,
        formState.file,
        handleClose,
        onClose,
        notificationApi,
    ]);

    const handleStartDateChange = (date: string[]) => {
        setFormState(prevState => ({...prevState, startDate: date[0]}));
    };

    const handleEndDateChange = (date: string[]) => {
        setFormState(prevState => ({...prevState, endDate: date[0]}));
    };

    const handleSwitch: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
        setFormState(prevState => ({...prevState, isPartial: target.checked}));
        if (target.checked) {
            setFormState(prevState => ({...prevState, endDate: undefined}));
        }
    };

    const handleFileSelect = (file: File | undefined) => {
        setFormState(prevState => ({...prevState, file}));
    };

    const handleSubmit = () => {
        if (!formState.file) return;

        const documentMetaData: IDocumentMetaData = {
            createdBy: 'currentUser',
            type: 'document',
            isForLot: formState.isPartial,
            isTemplate: false,
            fileName: formState.file.name,
            issueDate: formState.startDate,
            expireDate: formState.endDate,
            productsDetails: [], // TODO - замегнить пустой массив на нужные данные
        };

        const body = new FormData();
        body.append('file1', formState.file);
        body.append('documentMetaData', JSON.stringify(documentMetaData));

        createDocument({
            header: {
                securityCode: 'security_code',
            },
            body,
        });
    };

    return (
        <>
            {notificationContextHolder}
            <Modal show={show} onClose={handleClose} size="m">
                <ModalHeader title="Добавление документа" />
                <ModalContent className={styles.content}>
                    <Grid gap={24} className={styles.grid}>
                        <FileUploadForm onFileSelect={handleFileSelect} />

                        <CustomSwitch checked={formState.isPartial} handleChange={handleSwitch} name="Партийный" />

                        <Grid gap={36} columns="auto auto">
                            <DatePicker
                                date={[formState.startDate!]}
                                onChange={handleStartDateChange}
                                label={'Дата начала действия'}
                                size="s"
                                view="single"
                                mode="single"
                                className={styles.dateInput}
                            />

                            {!formState.isPartial && (
                                <DatePicker
                                    date={[formState.endDate!]}
                                    onChange={handleEndDateChange}
                                    label={'Дата окончания'}
                                    size="s"
                                    view="single"
                                    mode="single"
                                    className={styles.dateInput}
                                />
                            )}
                        </Grid>

                        <br />
                        <br />
                        <br />
                    </Grid>
                </ModalContent>
                <ModalFooter>
                    <Grid columnGap={16} columns="repeat(2, 1fr)">
                        <RegularButton onClick={onClose} size="m" variant="outline" disabled={isButtonDisabled}>
                            {t('Buttons.Cancel')}
                        </RegularButton>

                        <RegularButton onClick={handleSubmit} disabled={isButtonDisabled}>
                            {t('Buttons.Save')}
                        </RegularButton>
                    </Grid>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default TaskUploadDocumentModal;
