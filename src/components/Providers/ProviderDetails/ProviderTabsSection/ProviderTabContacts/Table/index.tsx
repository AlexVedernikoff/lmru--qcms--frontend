import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getContactsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import { PROVIDER_CONTACTS_TABLE_ITEMS } from '../../../../../../common/mocks';

const ContactsTable: React.FC = () => {
    const {t} = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            ...getContactsTableColumns(t),
        ],
        [t]
    );

    const data = useMemo<IDataType[]>(() => PROVIDER_CONTACTS_TABLE_ITEMS, []);

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

export default ContactsTable;
