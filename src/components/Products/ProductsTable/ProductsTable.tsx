import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
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
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState(0);
    const {t} = useTranslation('products');
    const navigate = useNavigate();

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
            {
                title: t('WithModels.Table.Columns.providerStatus'),
                dataIndex: 'providerStatus',
                render: (text: string) => <div>{text}</div>,
                width: 246,
            },
            {
                title: t('WithModels.Table.Columns.productCode'),
                dataIndex: 'productCode',
                width: 124,
            },
            {
                title: t('WithModels.Table.Columns.productName'),
                dataIndex: 'productName',
                width: 346,
            },
            {
                title: t('WithModels.Table.Columns.providerCode'),
                dataIndex: 'providerCode',
                width: 160,
            },
            {
                title: t('WithModels.Table.Columns.providerName'),
                dataIndex: 'providerName',
                width: 260,
            },
            {
                title: t('WithModels.Table.Columns.qualityStatus'),
                dataIndex: 'qualityStatus',
                width: 390,
            },
            /* Additional Columns */
            {
                title: t('WithModels.Table.Columns.QE'),
                dataIndex: 'QE',
                width: 130,
            },
            {
                title: t('WithModels.Table.Columns.qualityModel'),
                dataIndex: 'qualityModel',
                width: 245,
            },
            {
                title: t('WithModels.Table.Columns.EAN'),
                dataIndex: 'EAN',
                width: 245,
            },
            {
                title: t('WithModels.Table.Columns.lastProductStatusDate'),
                dataIndex: 'lastProductStatusDate',
                width: 160,
            },
            {
                title: t('WithModels.Table.Columns.qualityModelNumber'),
                dataIndex: 'qualityModelNumber',
                width: 160,
            },
            {
                title: t('WithModels.Table.Columns.qualityModelManager'),
                dataIndex: 'qualityModelManager',
                width: 300,
            },
            {
                title: t('WithModels.Table.Columns.productDataCompleteness'),
                dataIndex: 'productDataCompleteness',
                width: 340,
            },
            {
                title: t('WithModels.Table.Columns.productTopAVS'),
                dataIndex: 'productTopAVS',
                width: 300,
            },
            {
                title: t('WithModels.Table.Columns.productCreationDate'),
                dataIndex: 'productCreationDate',
                width: 160,
            },
            {
                title: t('WithModels.Table.Columns.productActionsBy'),
                dataIndex: 'productActionsBy',
                width: 160,
            },
            {
                title: t('WithModels.Table.Columns.departmentCode'),
                dataIndex: 'departmentCode',
                width: 120,
            },
            {
                title: t('WithModels.Table.Columns.subDepartmentCode'),
                dataIndex: 'subDepartmentCode',
                width: 120,
            },
            {
                title: t('WithModels.Table.Columns.TN_VED_Code'),
                dataIndex: 'TN_VED_Code',
                width: 120,
            },
            {
                title: t('WithModels.Table.Columns.departmentName'),
                dataIndex: 'departmentName',
                width: 300,
            },
            {
                title: t('WithModels.Table.Columns.nomenclature'),
                dataIndex: 'nomenclature',
                width: 1100,
            },
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
                style={{position: 'absolute', overflow: 'auto', width: containerSize}}
            />
        </div>
    );
};

export default ProductsTable;
