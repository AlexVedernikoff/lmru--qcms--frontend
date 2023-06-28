import {DragEvent, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {PropsTaskDetails} from '../../../TaskDetails';
import {ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import styles from './styles.module.css';
import {RegularButton} from 'fronton-react';
import DownloadIcon from '../../../../../Icons/DownloadIcon';
import {useParams} from 'react-router-dom';

const UploadedDocumentsTable: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    const {id} = useParams();
    const [drag, setDrag] = useState(false);
    const [, setResponseLoadDocuments] = useState();
    const filePicker = useRef<HTMLInputElement | null>(null);
    const {taskDetails} = props;
    const columns = useMemo<ColumnsType<ITaskUploadedDocument>>(() => getTableColumns(t), [t]);
    const uploadedDocuments = taskDetails.documents.uploadedDocuments;

    const data = useMemo<ITaskUploadedDocument[]>(
        () => (uploadedDocuments || []).map(d => ({...d, key: d.id})),
        [uploadedDocuments]
    );

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    };

    const onDropHandler = async (e: DragEvent) => {
        e.preventDefault();
        const {files} = e.dataTransfer;
        if (!files.length) return;
        const formData = new FormData();
        formData.append('file1', files[0]);
        formData.append(
            'documentMetaData',
            JSON.stringify({
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
                        qualityActionId: Number(id),
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
            })
        );
        const res = await fetch(
            'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/create-quality-document',
            {
                method: 'POST',
                body: formData,
                headers: {
                    securityCode: 'security_code',
                },
            }
        );
        const data = await res.json();

        setResponseLoadDocuments(data);
        setDrag(false);
    };

    const handleChange = async (e: {target: {files: FileList | null}}) => {
        if (!e.target.files) return;
        const formData = new FormData();
        const {files} = e.target;
        formData.append('file1', files[0]);
        formData.append(
            'documentMetaData',
            JSON.stringify({
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
                        qualityActionId: Number(id),
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
            })
        );
        const res = await fetch(
            'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/create-quality-document',
            {
                method: 'POST',
                body: formData,
                headers: {
                    securityCode: 'security_code',
                },
            }
        );
        const data = await res.json();
        setResponseLoadDocuments(data);
    };

    const handlePick = () => {
        filePicker.current?.click();
    };

    return (
        <>
            <CustomTable
                columns={columns}
                dataSource={data}
                scroll={{x: 400}}
                tableLayout="fixed"
                size="small"
                bordered
            />
            {drag ? (
                <div
                    className={styles.drop}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    Отпустите сюда файлы, чтобы загрузить
                </div>
            ) : (
                <div
                    className={styles.drop}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <br />
                    Перенесите файлы, чтобы загрузить <br />
                    <RegularButton
                        size="l"
                        variant="primary"
                        iconLeft={<DownloadIcon type="outline" />}
                        className={styles.save}
                        onClick={handlePick}
                    >
                        <input
                            className={styles.hidden}
                            type="file"
                            onChange={handleChange}
                            ref={filePicker}
                            accept=".xls, .csv"
                        ></input>
                        Выберите файлы
                    </RegularButton>
                    <br />
                    Допустимые форматы: xls, csv
                    <br />
                    Максимальный размер одного файла 500 Мб
                    <br />
                </div>
            )}
        </>
    );
};

export default UploadedDocumentsTable;
