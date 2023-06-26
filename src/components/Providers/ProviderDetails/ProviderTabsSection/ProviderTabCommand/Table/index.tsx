import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getCommandTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {useGetSupplierDetsQuery} from '../../../../../../api/getSupplierDetails';
import {ISupplierDetailsResponse} from '../../../../../../common/types/supplierDetails';

const CommandTable: React.FC = () => {
    const {id: supplierId = ''} = useParams();
    console.log('id  useParams =', supplierId);

    const {data: supplierDetails} = useGetSupplierDetsQuery(supplierId);
    const {supplierProjectTeam} = (supplierDetails as ISupplierDetailsResponse) || {};
    const data: IDataType[] = supplierProjectTeam
        ? supplierProjectTeam.map(({activityCode, emailAddress, id, name, surname, tabelNumber}) => ({
              key: id,
              userServiceNumber: tabelNumber,
              surname,
              name,
              email: emailAddress,
              activityTypeCode: activityCode,
          }))
        : [];

    const {t} = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(() => [...getCommandTableColumns(t)], [t]);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default CommandTable;
