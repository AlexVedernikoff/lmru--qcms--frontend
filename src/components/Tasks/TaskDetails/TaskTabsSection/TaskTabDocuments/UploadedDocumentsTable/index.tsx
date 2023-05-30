import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TASK_UPLOADED_DOCUMENT_ITEMS} from '../../../../../../common/mocks';

const UploadedDocumentsTable: React.FC = () => {
    const {t} = useTranslation('tasks');

    const columns = useMemo<ColumnsType<IDataType>>(() => getTableColumns(t), [t]);

    const data = useMemo<IDataType[]>(() => TASK_UPLOADED_DOCUMENT_ITEMS, []);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default UploadedDocumentsTable;
