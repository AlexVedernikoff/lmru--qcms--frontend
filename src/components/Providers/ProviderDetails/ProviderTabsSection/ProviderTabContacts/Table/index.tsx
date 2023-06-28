import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getContactsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {useGetSupplierDetsQuery} from '../../../../../../api/getSupplierDetails';
import {ISupplierDetailsResponse} from '../../../../../../common/types/supplierDetails';

const ContactsTable: React.FC = () => {
    const {t} = useTranslation('providers');
    const {id: supplierId = ''} = useParams();

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

    const columns = useMemo<ColumnsType<IDataType>>(() => [...getContactsTableColumns(t)], [t]);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default ContactsTable;
