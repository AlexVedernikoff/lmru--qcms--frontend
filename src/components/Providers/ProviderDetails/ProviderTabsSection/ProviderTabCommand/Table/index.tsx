import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getCommandTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {PROVIDER_COMMAND_TABLE_ITEMS} from '../../../../../../common/mocks';
import {useGetSupplierDetsQuery} from '../../../../../../api/getSupplierDetails';
import {ISupplierDetailsResponse, ISupplierProjectTeam} from '../../../../../../common/types/supplierDetails';

const CommandTable: React.FC = () => {
    const supplierId = 1;
    const {data: supplierDetails = [], isLoading: isLoadingSupplierDetails} = useGetSupplierDetsQuery(supplierId);
    const {supplierProjectTeam} = supplierDetails as ISupplierDetailsResponse;
    const data: IDataType[] = supplierProjectTeam
        ? supplierProjectTeam.map(el => {
              const {activityCode, emailAddress, id, name, surname, tabelNumber} = el;
              return {
                  key: id,
                  userServiceNumber: tabelNumber,
                  surname,
                  name,
                  email: emailAddress,
                  activityTypeCode: activityCode,
              };
          })
        : [];

    const {t} = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(() => [...getCommandTableColumns(t)], [t]);

    // const data1 = useMemo<IDataType[]>(() => PROVIDER_COMMAND_TABLE_ITEMS, []);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default CommandTable;
