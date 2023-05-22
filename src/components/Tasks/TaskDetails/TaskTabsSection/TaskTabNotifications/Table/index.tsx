import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getProductsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TASK_NOTIFICATIONS_TABLE_ITEMS} from '../../../../../../common/mocks';

const NotificationTable: React.FC = () => {
    const {t} = useTranslation('tasks');

    const columns = useMemo<ColumnsType<IDataType>>(() => [...getProductsTableColumns(t)], [t]);

    const data = useMemo<IDataType[]>(() => TASK_NOTIFICATIONS_TABLE_ITEMS, []);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default NotificationTable;
