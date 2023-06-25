import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PLAN_REQUIREMENT_TABLE_ITEMS} from '../../../../common/mocks';
import {IDataType, getTableColumns} from './TableColumns';
import CustomTable from '../../../Common/CustomTable';

const MasterPlanTable: React.FC = () => {
    const {t} = useTranslation('models');

    const columns = useMemo<ColumnsType<IDataType>>(() => getTableColumns(t), [t]);

    const data = useMemo<IDataType[]>(() => PLAN_REQUIREMENT_TABLE_ITEMS, []);

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            fixed: 'left',
        }),
        []
    );

    return (
        <CustomTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default MasterPlanTable;
