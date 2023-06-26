import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getContactsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {useGetSupplierDetsQuery} from '../../../../../../api/getSupplierDetails';
import {ISupplierDetailsResponse} from '../../../../../../common/types/supplierDetails';

const ContactsTable: React.FC = () => {
    const supplierId = window.location.href.split('/').slice(-1)[0];
    const {data: supplierDetails = []} = useGetSupplierDetsQuery(supplierId);
    const {supplierContacts} = supplierDetails as ISupplierDetailsResponse;
    const data: IDataType[] = supplierContacts
        ? supplierContacts.map(el => {
              const {id, surname, name, emailAddress, phoneNumber, mobilePhoneNumber, type} = el;
              return {
                  key: id,
                  surname,
                  name,
                  email: emailAddress,
                  telephone: phoneNumber,
                  mobile: mobilePhoneNumber,
                  type,
              };
          })
        : [];

    const {t} = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(() => [...getContactsTableColumns(t)], [t]);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default ContactsTable;
