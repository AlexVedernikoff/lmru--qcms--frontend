import {useCallback, useMemo} from 'react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {IProductTableItem} from '../../../common/models';
import {PRODUCT_TABLE_ITEMS} from '../../../common/mocks';
import {useNavigate} from 'react-router-dom';
import {PRODUCTS_ROUTES} from '../../../common/consts';
import {RegularButton} from 'fronton-react';

interface IDataType extends IProductTableItem {
    key: React.Key;
}

const ProductsTable: React.FC = () => {
    const navigate = useNavigate();

    const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(PRODUCTS_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 16,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.productCode.toString()}
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
            {
                title: 'Статус поставщика',
                dataIndex: 'providerStatus',
                render: (text: string) => <div>{text}</div>,
            },
            {
                title: 'Код товара',
                dataIndex: 'productCode',
            },
            {
                title: 'Наименование товара',
                dataIndex: 'productName',
            },
            {
                title: 'Код поставщика',
                dataIndex: 'providerCode',
            },
            {
                title: 'Наименование поставщика',
                dataIndex: 'providerName',
            },
            {
                title: 'Статус качества',
                dataIndex: 'qualityStatus',
            },
        ],
        [handleViewProductDetails]
    );

    const data = useMemo<IDataType[]>(() => PRODUCT_TABLE_ITEMS, []);

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: IDataType) => ({
                disabled: record.qualityStatus === '2',
                name: record.qualityStatus,
            }),
            fixed: 'left',
        }),
        []
    );

    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};

export default ProductsTable;
