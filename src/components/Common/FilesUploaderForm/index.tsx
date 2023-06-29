import {useState, DragEvent, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import DownloadIcon from '../../Icons/DownloadIcon';
import s from './FilesUploaderForm.module.css';
import api from './api';

const FilesUploaderForm = () => {
    const {t} = useTranslation('files');
    const [drag, setDrag] = useState(false);
    const refFilePicker = useRef<HTMLInputElement | null>(null);
    const [createDocument] = api.useCreateDocumentMutation();

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    };

    const handleFilesSelect = (files: FileList) => {
        if (!files.length) return;
        const formData = new FormData();
        formData.append('file1', files[0]);

        const documentMetaData = {
            type: 'test al',
            isTemplate: false,
            createdBy: 'string',
            mask: 'string',
            isForLot: false,
            issueDate: '2023-06-27',
            expireDate: '2023-06-27',
            rosAccreditationApproveStatus: 'string',
            productsDetails: [
                {
                    approvingStatus: 'APPROVED',
                    productId: 0,
                    productDescription: 'string',
                    productCode: 'string',
                    productTNVEDCode: 'string',
                    ean: 'string',
                    supplierId: 0,
                    supplierRMSCode: 'string',
                    supplierName: 'string',
                    supplierTaxIdentifier: 'string',
                    qualityActionId: Number(),
                    productManagementNomenclature: {
                        departmentId: 0,
                        subdepartmentId: 0,
                        typeId: 0,
                        subtypeId: 0,
                    },
                    productModelNomenclature: {
                        departmentId: 'string',
                        subdepartmentId: 'string',
                        consolidationId: 'string',
                        codeId: 'string',
                    },
                    buCodes: ['string'],
                },
            ],
        };

        formData.append('documentMetaData', JSON.stringify(documentMetaData));

        createDocument({
            body: formData,
            header: {
                securityCode: 'security_code',
            },
        });
    };

    const onDropHandler = async (e: DragEvent) => {
        e.preventDefault();
        handleFilesSelect(e.dataTransfer.files);
        setDrag(false);
    };

    const handlePick = () => {
        refFilePicker.current?.click();
    };

    const handleChange = async (event: {target: {files: FileList | null}}) => {
        const {files} = event.target;
        if (!files) return;
        handleFilesSelect(files);
    };

    if (drag) {
        return (
            <div
                className={s.root}
                onDragStart={dragStartHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragStartHandler}
                onDrop={onDropHandler}
            >
                {t('Drop')}
            </div>
        );
    }

    return (
        <div
            className={s.root}
            onDragStart={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
        >
            <br />
            {t('Title')}
            <br />
            <RegularButton
                size="l"
                variant="primary"
                iconLeft={<DownloadIcon type="outline" />}
                className={s.save}
                onClick={handlePick}
            >
                <input
                    className={s.hidden}
                    type="file"
                    onChange={handleChange}
                    ref={refFilePicker}
                    accept=".xls, .csv"
                />
                {t('Button')}
            </RegularButton>
            <br />
            {t('Format')}
            <br />
            {t('Size')}
            <br />
        </div>
    );
};

export default FilesUploaderForm;
