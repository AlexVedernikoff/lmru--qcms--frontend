import {DragEvent, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TASK_UPLOADED_DOCUMENT_ITEMS} from '../../../../../../common/mocks';
import {PropsTaskDetails} from '../../../TaskDetails';
import {ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import styles from './styles.module.css';
import {RegularButton} from 'fronton-react';
import DownloadIcon from '../../../../../Icons/DownloadIcon';

const UploadedDocumentsTable: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    const [drag, setDrag] = useState(false);
    const [responseLoadDocuments, setResponseLoadDocuments] = useState();
    const filePicker = useRef<HTMLInputElement | null>(null);
    // const { taskDetails } = props;
    const columns = useMemo<ColumnsType<ITaskUploadedDocument>>(() => getTableColumns(t), [t]);

    const data = useMemo<ITaskUploadedDocument[]>(() => TASK_UPLOADED_DOCUMENT_ITEMS, []);

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
        formData.append('file', files[0]);
        formData.append(
            'documentMetaData',
            JSON.stringify({type: 'string', lotDocumentFlag: true, isTemplate: true, createdBy: 'string'})
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

    // TODO переписать позже +  получаем 500 +попробовать загрузить норм xls и заполнить documnentMetaData + считать данные и обновить на странице

    const handleChange = async (e: {target: {files: any}}) => {
        console.log(e.target.files, ' files');
        if (!e.target.files) return;
        const formData = new FormData();
        const files = [...e.target.files];
        formData.append('file', files[0]);
        formData.append(
            'documentMetaData',
            JSON.stringify({
                type: 'string',
                lotDocumentFlag: true,
                isTemplate: true,
                createdBy: 'string',
                isForLot: true,
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
    console.log(responseLoadDocuments, 'response');
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
