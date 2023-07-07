import {useTranslation} from 'react-i18next';
import {Dropdown, Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import {IProduct} from '../../../../common/types/products';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import FileUploadForm from '../../../Common/FileUploadForm';
import withModelApi from '../withModelApi';
import {useCallback, useEffect, useState} from 'react';
import {ICreateTaskRequestBody} from '../../../../common/types/createTask';
import {notification} from 'antd';

import s from './styles.module.css';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

interface FormState {
    file?: File;
}

const initialFormState: FormState = {};

const createTaskRequestMock: ICreateTaskRequestBody = {
    qualityActions: [
        {
            id: 0,
            actionStatus: 'DRAFT',
            targetBuCodes: [0],
            conclusion: 'string',
            isForUpdate: true,
            categoryName: 'string',
            categoryTypeName: 'string',
            realisationDueDate: '2023-07-03',
            approvalDueDate: '2023-07-03',
            approvers: [
                {
                    type: 'SUPPLIER',
                    externalId: 'string',
                },
            ],
            responsible: [
                {
                    type: 'SUPPLIER',
                    externalId: 'string',
                },
            ],
            publicComments: [
                {
                    id: 0,
                    order: 0,
                    comment: 'string',
                    createdAt: '2023-07-03T14:01:23.296Z',
                    createdBy: 'string',
                },
            ],
            supplierData: {
                id: 0,
                name: 'string',
                supplierRMSCode: 'string',
                supplierAdeoCode: 'string',
                supplierTaxIdentifier: 'string',
            },
            product: {
                id: 0,
                name: 'string',
                code: 'string',
                ean: 'string',
                isFromProject: true,
                productRange: 'string',
                qualityModel: 'string',
                regulatoryStatus: 'string',
                adeoRisk: 'string',
            },
            documents: {
                awaitedDocuments: [
                    {
                        type: 'string',
                        templateId: 0,
                        linkedRegulations: [0],
                        requirementType: 'string',
                    },
                ],
            },
        },
    ],
    createdBy: 'string',
};

const ProductsAddTasksModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const {t} = useTranslation('products');

    const [createTask, createTaskRequestState] = withModelApi.useCreateTaskMutation();

    const [formState, setFormState] = useState<FormState>(initialFormState);

    const isFromValid = formState.file;

    const handleClose = useCallback(() => {
        onClose();
        setFormState(initialFormState);
    }, [onClose]);

    useEffect(() => {
        if (!isFromValid) return;
        if (createTaskRequestState.isError) {
            notificationApi.open({
                message: 'Не удалось создать задачу. Повторите попытку позже.',
            });
        }
        if (createTaskRequestState.isSuccess) {
            notificationApi.open({
                message: 'Задача успешно создана!',
            });
            handleClose();
        }
    }, [createTaskRequestState, isFromValid, notificationApi, handleClose]);

    const handleSubmit = () => {
        if (!isFromValid) return;
        createTask({
            body: createTaskRequestMock,
            header: {
                securityCode: '',
            },
        });
    };

    const handleFileSelect = (file?: File) => {
        setFormState(prevState => ({...prevState, file}));
    };

    return (
        <>
            {notificationContextHolder}
            <Modal onClose={handleClose} show={show} size="l">
                <ModalHeader title={t('WithModels.Actions.actions.addTasks')} />
                <ModalContent>
                    <Grid rowGap="20px">
                        <Grid columns="1fr 1fr 1fr 1fr" columnGap="30px">
                            <Grid rowGap="20px">
                                <Dropdown label={t('WithModels.addTaskModalWindow.categoryLabel')} />
                                <Dropdown label={t('WithModels.addTaskModalWindow.documentTypeLabel')} />
                            </Grid>
                            <Grid rowGap="20px">
                                <Dropdown label={t('WithModels.addTaskModalWindow.typeLabel')} />
                                <Dropdown label={t('WithModels.addTaskModalWindow.documentsLabel')} />
                            </Grid>
                            <Grid rowGap="20px">
                                <Dropdown label={t('WithModels.addTaskModalWindow.responsiblePersonLabel')} />
                                <Dropdown label={t('WithModels.addTaskModalWindow.BULabel')} />
                            </Grid>
                            <Grid rowGap="20px">
                                <Dropdown label={t('WithModels.addTaskModalWindow.approverPersonLabel')} />
                            </Grid>
                        </Grid>
                        <hr className={s.divider} />
                        <Grid columns="1fr 1fr" columnGap="32px">
                            <Dropdown label={t('WithModels.addTaskModalWindow.lawRequirements')} />
                            <Dropdown label={t('WithModels.addTaskModalWindow.processLabel')} />
                        </Grid>
                        <CustomSwitch
                            checked={false}
                            handleChange={() => undefined}
                            name={t('WithModels.addTaskModalWindow.dutyLabel')}
                        />
                        <FileUploadForm onFileSelect={handleFileSelect} />
                    </Grid>
                </ModalContent>
                <ModalFooter>
                    <Grid justifyContent="right" columns="auto auto" columnGap="24px">
                        <RegularButton variant="outline" size="l" onClick={handleClose}>
                            {t('WithModels.addTaskModalWindow.closeModalButton')}
                        </RegularButton>
                        <RegularButton variant="primary" size="l" disabled={!isFromValid} onClick={handleSubmit}>
                            {t('WithModels.addTaskModalWindow.submitButton')}
                        </RegularButton>
                    </Grid>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ProductsAddTasksModalWindow;
