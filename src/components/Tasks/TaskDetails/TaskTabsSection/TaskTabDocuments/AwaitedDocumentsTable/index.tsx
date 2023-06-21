import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TASK_AWAITING_DOCUMENT_ITEMS} from '../../../../../../common/mocks';
import {PropsTaskDetails} from '../../../TaskDetails';
import {ITaskAwaitingDocument} from '../../../../../../common/types/taskDetails';

const AwaitedDocumentsTable: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    // const {taskDetails} = props;
    const columns = useMemo<ColumnsType<ITaskAwaitingDocument>>(() => getTableColumns(t), [t]);

    const data = useMemo<ITaskAwaitingDocument[]>(() => TASK_AWAITING_DOCUMENT_ITEMS, []);

    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            scroll={{x: true}}
            tableLayout="fixed"
            size="small"
            bordered
            expandable={{columnWidth: 100}}
        />
    );
};

export default AwaitedDocumentsTable;
