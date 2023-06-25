import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PRODUCTS_ROUTES} from '../../../../common/consts';
import {getProductTableColumns} from './ProductTableColumns';
import CustomTable from '../../../Common/CustomTable';
import {IWithModelItem, IWithModelResponse} from '../../../../common/types/withModel';
import {TWithReactKey} from '../../../../common/clientModels';

export type RawTable = Pick<IWithModelItem, 'id'>;

export type TDataType = TWithReactKey<IWithModelItem>;

interface IProps {
    onPageChange: (page: number, size: number) => void;
    tableData: IWithModelResponse;
    isLoading: boolean;
}

const ProductsTable: React.FC<IProps> = ({onPageChange, tableData, isLoading}) => {
    const navigate = useNavigate();
    const {t} = useTranslation('products');
    // const {productsList} = props;
    console.log(tableData, 'tableData');

    const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(PRODUCTS_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<TDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
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
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: RawTable[]) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: (record: IDataType) => ({
            //     disabled: record.qualityStatus === '2',
            //     name: record.qualityStatus,
            // }),
            fixed: 'left',
        }),
        []
    );

    return (
        <CustomTable
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
    );
};

export default ProductsTable;
