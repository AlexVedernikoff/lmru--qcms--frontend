import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getProductsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TASK_NOTIFICATIONS_TABLE_ITEMS} from '../../../../../../common/mocks';
import {PropsTaskDetails} from '../../../TaskDetails';

const NotificationTable: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    // const {taskDetails} = props;
    const columns = useMemo<ColumnsType<IDataType>>(() => [...getProductsTableColumns(t)], [t]);
    // TODO убрать моки
    const data = useMemo<IDataType[]>(() => TASK_NOTIFICATIONS_TABLE_ITEMS, []);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default NotificationTable;
