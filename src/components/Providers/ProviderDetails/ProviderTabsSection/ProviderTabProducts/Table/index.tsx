import {useMemo, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getProductsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {useGetSupplierDetsQuery} from '../../../../../../api/getSupplierDetails';
import {usePostSearchProdsMutation} from '../../../../../../api/postSearchProducts';

const ContactsTable: React.FC = () => {
    const {id: supplierId = ''} = useParams();
    const {data: supplierDetails} = useGetSupplierDetsQuery(supplierId);
    const [searchProducts, searchProductsResults] = usePostSearchProdsMutation();

    const dataArr = searchProductsResults.data?.content;

    useEffect(() => {
        if (supplierDetails?.supplierRMSCode) {
            searchProducts({
                pageIndex: 1,
                pageSize: 1,
                searchBy: {
                    code: supplierDetails?.supplierRMSCode,
                },
            });
        }
    }, [searchProducts, supplierDetails?.supplierRMSCode]);

    const data: IDataType[] = dataArr
        ? dataArr.map(({ean, code, description, regulatoryStatus, supplierCode, qualityStatuses}) => ({
              key: code,
              name: description,
              code: code,
              SupplierBindingStatus: regulatoryStatus,
              SupplierLink: supplierCode,
              EAN: ean,
              ComplianceStatusBU: `${qualityStatuses[0].qualityStatus} ${qualityStatuses[0].buCode} 
`,
          }))
        : [];

    const {t} = useTranslation('providers');

    const columns = useMemo<ColumnsType<IDataType>>(() => [...getProductsTableColumns(t)], [t]);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default ContactsTable;
