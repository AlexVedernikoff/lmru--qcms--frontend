import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/es/table';
import { IDataType, getProductsTableColumns } from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import { PROVIDER_PRODUCTS_TABLE_ITEMS } from '../../../../../../common/mocks';
import { useGetSupplierDetsQuery } from "../../../../../../api/getSupplierDetails"
import { ISupplierDetailsResponse } from "../../../../../../common/types/supplierDetails"

const ContactsTable: React.FC = () => {
    const supplierId = 1;
    const { data: supplierDetails = [], isLoading: isLoadingSupplierDetails } = useGetSupplierDetsQuery(supplierId);

    const { t } = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            ...getProductsTableColumns(t),
        ],
        [t]
    );

    const data = useMemo<IDataType[]>(() => PROVIDER_PRODUCTS_TABLE_ITEMS, []);

    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            scroll={{ x: 400 }}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default ContactsTable;
