import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PRODUCT_TABLE_ITEMS} from '../../../../common/mocks';
import {PRODUCTS_ROUTES} from '../../../../common/consts';
import {IDataType, getProductTableColumns} from './ProductTableColumns';

const ProductsTable: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState(500);

    const navigate = useNavigate();
    const {t} = useTranslation('products');

    const updateContainerSize = () => {
        if (containerRef.current) {
            setContainerSize(containerRef.current.clientWidth);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateContainerSize);
        updateContainerSize();
        return () => {
            window.removeEventListener('resize', updateContainerSize);
        };
    }, []);

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
                width: 64,
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
            ...getProductTableColumns(t),
        ],
        [handleViewProductDetails, t]
    );

    const data = useMemo<IDataType[]>(() => PRODUCT_TABLE_ITEMS, []);

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        <div ref={ref => (containerRef.current = ref)}>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                scroll={{x: 400}}
                tableLayout="fixed"
                size="small"
                style={{position: 'absolute', width: containerSize}}
            />
        </div>
    );
};

export default ProductsTable;
