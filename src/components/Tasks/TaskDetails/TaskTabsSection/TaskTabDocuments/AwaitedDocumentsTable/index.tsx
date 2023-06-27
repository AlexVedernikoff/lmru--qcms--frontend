import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {PropsTaskDetails} from '../../../TaskDetails';
import {ITaskAwaitingDocument} from '../../../../../../common/types/taskDetails';

const AwaitedDocumentsTable: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    const {taskDetails} = props;
    const columns = useMemo<ColumnsType<ITaskAwaitingDocument>>(() => getTableColumns(t), [t]);
    const awaitedDocuments = taskDetails.documents?.awaitedDocuments;
    const data = useMemo<ITaskAwaitingDocument[] | undefined>(() => awaitedDocuments, [awaitedDocuments]);

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
