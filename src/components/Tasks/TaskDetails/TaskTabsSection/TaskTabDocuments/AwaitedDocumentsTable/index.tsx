import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {ITaskAwaitingDocument, ITaskDetails} from '../../../../../../common/types/taskDetails';

interface Props {
    taskDetails: ITaskDetails;
}

const AwaitedDocumentsTable: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');
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
