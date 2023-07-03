import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import CustomTable from '../../../../../Common/CustomTable';
import {getDocsTabColumns} from './getDocsTabColumns';
import {useGetDetailsForProductsQuery} from '../../../productDetailsApi';
import {securityCode} from '../../../mockProductDetails';
import {docTabMapping} from '../../../ProductDetailsMapping/ProductDetailsTabs/docTabMapping';
import {IDataProductDetailsTabDoc} from '../../../../../../common/types/productDetails';
import {useParams} from 'react-router-dom';

const DocumentsTab: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const columns = useMemo<ColumnsType<IDataProductDetailsTabDoc>>(() => getDocsTabColumns(t), [t]);

    const uploadedDocuments: IDataProductDetailsTabDoc[] =
        details?.uploadedDocuments && details?.uploadedDocuments.length > 0
            ? docTabMapping(details.uploadedDocuments, productId, t)
            : [];

    return (
        <CustomTable
            columns={columns}
            dataSource={uploadedDocuments}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default DocumentsTab;
