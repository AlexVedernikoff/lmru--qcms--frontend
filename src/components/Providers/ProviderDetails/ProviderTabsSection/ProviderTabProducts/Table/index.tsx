import {useMemo, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getProductsTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {PROVIDER_PRODUCTS_TABLE_ITEMS} from '../../../../../../common/mocks';
import {useGetSupplierDetsQuery} from '../../../../../../api/getSupplierDetails';
import {usePostSearchProdsMutation} from '../../../../../../api/postSearchProducts';
import {ISearchProductsResponse} from '../../../../../../common/types/searchProducts';

const ContactsTable: React.FC = () => {
    const {id: supplierId = ''} = useParams();
    console.log('id  useParams =', supplierId);

    type QueryReturnValue =
        | {
              data: ISearchProductsResponse;
          }
        | {
              error: any;
          };

    const [productsData, setproductsData] = useState<{
        data: ISearchProductsResponse;
    }>();

    // const [productsData, setproductsData] = useState<QueryReturnValue>();

    const {data: supplierDetails} = useGetSupplierDetsQuery(supplierId);
    const {supplierRMSCode} = supplierDetails || {};
    console.log('supplierRMSCode = ', supplierRMSCode);

    const [searchProducts] = usePostSearchProdsMutation();

    const requestBody = {
        pageIndex: 1,
        pageSize: 1,
        searchBy: {
            // code: supplierRMSCode,
            code: '1',
        },
    };

    const receiveQualityDocuments = async () => {
        // const requestBody = prepareBody(productsDocumentsFiltersState);
        const productsDocumentsTableData = await searchProducts(requestBody);
        // console.log('productsDocumentsTableData = ', productsDocumentsTableData);
        setproductsData(
            productsDocumentsTableData as {
                data: ISearchProductsResponse;
            }
        );
    };

    const dataArr = productsData?.data.content;
    console.log('productsData.data.content = ', dataArr);

    useEffect(() => {
        receiveQualityDocuments();
    }, [supplierId]);

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

    // const data1 = useMemo<IDataType[]>(() => PROVIDER_PRODUCTS_TABLE_ITEMS, []);

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default ContactsTable;
