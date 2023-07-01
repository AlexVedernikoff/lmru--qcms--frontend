import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DatePicker, Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import tasksApi from '../../tasksApi';
import FileUploadForm from '../../../Common/FileUploadForm';
import {IDocumentMetaData} from '../../../../common/types/files';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import styles from './DocumentsModal.module.css';
import {TDataType} from '../types';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    dataList: TDataType[];
}

const DocumnentModal: React.FC<IProps> = ({isOpen, onClose, dataList}) => {
    const {t} = useTranslation('tasks');

    const [isPartial, setIsPartial] = useState(false);
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [file, setFile] = useState<File | undefined>();

    const [createDocument, createDocumentResult] = tasksApi.endpoints.createDocument.useMutation();

    const isButtonDisabled = useMemo(
        () => !file || (isPartial ? !startDate : !startDate || !endDate),
        [endDate, file, isPartial, startDate]
    );

    useEffect(() => {
        if (createDocumentResult.isSuccess) {
            onClose();
        }

        if (createDocumentResult.isError) {
            type TDataError = {data: {errors: [{message: string}]}};
            alert((createDocumentResult.error as unknown as TDataError)?.data?.errors?.[0]?.message);
        }
    }, [createDocumentResult.error, createDocumentResult.isError, createDocumentResult.isSuccess, onClose]);

    const handleStartDateChange = (date: string[]) => {
        setStartDate(date[0]);
    };

    const handleEndDateChange = (date: string[]) => {
        setEndDate(date[0]);
    };

    const handleClose = () => {
        onClose();
    };

    const handleSwitch: React.ChangeEventHandler<HTMLInputElement> = e => {
        setIsPartial(e.target.checked);
        if (e.target.checked) {
            setEndDate(undefined);
        }
    };

    const handleFileSelect = (file: File | undefined) => {
        setFile(file);
    };

    const handleSave = async () => {
        if (file) {
            const documentMetaData: IDocumentMetaData = {
                createdBy: 'currentUser',
                type: 'document',
                isForLot: isPartial,
                isTemplate: false,
                fileName: file.name,
                issueDate: startDate,
                expireDate: endDate,
                productsDetails: dataList.map(d => ({
                    qualityActionId: d.id,
                    buCodes: d.targetBuCodes?.map(c => c.toString()),
                    approvingStatus: 'WAITING_FOR_APPROVAL',
                    productId: d.product.id,
                    ean: d.product.ean,
                    productCode: d.product.code,
                    productDescription: d.product.regulatoryStatus,
                    supplierId: d.supplierData.id,
                    supplierName: d.supplierData.name,
                    supplierRMSCode: d.supplierData.supplierRMSCode,
                    supplierTaxIdentifier: d.supplierData.supplierTaxIdentifier,
                    productManagementNomenclature: {
                        departmentId: 0,
                        subdepartmentId: 0,
                        subtypeId: 0,
                        typeId: 0,
                    },
                    productModelNomenclature: {
                        codeId: '',
                        consolidationId: '',
                        departmentId: '',
                        subdepartmentId: '',
                    },
                })),
            };

            const body = new FormData();
            body.append('file1', file);
            body.append('documentMetaData', JSON.stringify(documentMetaData));

            await createDocument({
                header: {
                    securityCode: 'security_code',
                },
                body,
            });
        }
    };

    return (
        <Modal show={isOpen} onClose={createDocumentResult.isLoading ? () => {} : handleClose} size="m">
            <ModalHeader title="Добавление документа" />
            <ModalContent className={styles.content}>
                <Grid gap={24} className={styles.grid}>
                    <FileUploadForm onFileSelect={handleFileSelect} />

                    <CustomSwitch checked={isPartial} handleChange={handleSwitch} name="Партийный" />

                    <Grid gap={36} columns="auto auto">
                        <DatePicker
                            date={[startDate!]}
                            onChange={handleStartDateChange}
                            label={'Дата начала действия'}
                            size="s"
                            view="single"
                            mode="single"
                            className={styles.dateInput}
                        />

                        {!isPartial && (
                            <DatePicker
                                date={[endDate!]}
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
                    <RegularButton
                        onClick={onClose}
                        size="m"
                        variant="outline"
                        disabled={createDocumentResult.isLoading || isButtonDisabled}
                    >
                        {t('Buttons.Cancel')}
                    </RegularButton>

                    <RegularButton onClick={handleSave} disabled={createDocumentResult.isLoading || isButtonDisabled}>
                        {t('Buttons.Save')}
                    </RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default DocumnentModal;
