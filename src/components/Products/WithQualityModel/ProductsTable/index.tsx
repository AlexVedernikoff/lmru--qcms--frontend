import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {getProductTableColumns} from './ProductTableColumns';
import CustomTable from '../../../Common/CustomTable';
import {TWithReactKey} from '../../../../common/clientModels';
import {IProduct, IProductsResponse} from '../../../../common/types/products';
import NotFound from '../../../Icons/NotFound';
import MagnifyingGlassIcon from '../../../Icons/MagnifyingGlassIcon';
import {RoutePath} from 'common/routes';

export type RawTable = Pick<IProduct, 'id'>;

export type TDataType = TWithReactKey<IProduct>;

interface IProps {
    onPageChange: (page: number, size: number) => void;
    onProductsSelect: (products: IProduct[]) => void;
    tableData: IProductsResponse;
    isLoading: boolean;
}

const ProductsTable: React.FC<IProps> = ({onPageChange, onProductsSelect, tableData, isLoading}) => {
    const navigate = useNavigate();
    const {t} = useTranslation('products');
    // const {productsList} = props;
    // console.log(tableData, 'tableData');

    const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(RoutePath.ProductDetails.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<TDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 57,
                render: (_value: string, record: TDataType) => (
                    <RegularButton
                        data-id={record.id}
                        onClick={handleViewProductDetails}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                    >
                        <MagnifyingGlassIcon />
                    </RegularButton>
                ),
                fixed: 'left',
            },
            ...getProductTableColumns(t),
        ],
        [handleViewProductDetails, t]
    );

    const dataSource = useMemo<TDataType[]>(
        () => (tableData?.content || []).map(d => ({...d, key: d.id})),
        [tableData]
    );
    const rowSelection = useMemo<TableRowSelection<TDataType>>(
        () => ({
            onChange: selectedProductsIds => {
                const selectedProducts = tableData.content.filter(({id}) => selectedProductsIds.includes(id));
                onProductsSelect(selectedProducts);
            },
        }),
        [tableData, onProductsSelect]
    );

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {(!dataSource?.length && !isLoading && <NotFound />) || (
                <CustomTable
                    loading={isLoading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{x: 400}}
                    tableLayout="fixed"
                    size="small"
                    bordered
                    pagination={{
                        pageSize: tableData?.pageable?.pageSize,
                        total: tableData?.pageable?.totalElements,
                        current: tableData?.pageable?.pageIndex + 1,
                        onChange: onPageChange,
                    }}
                />
            )}
        </div>
    );
};

export default ProductsTable;
