import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getCommandTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import { PROVIDER_COMMAND_TABLE_ITEMS } from '../../../../../../common/mocks';

const CommandTable: React.FC = () => {
    const {t} = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            ...getCommandTableColumns(t),
        ],
        [t]
    );

    const data = useMemo<IDataType[]>(() => PROVIDER_COMMAND_TABLE_ITEMS, []);

    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default CommandTable;
