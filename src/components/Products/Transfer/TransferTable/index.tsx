import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PRODUCT_TRANSFER_ITEMS} from '../../../../common/mocks';
import {IDataType, getTableColumns} from './TableColumns';
import CustomTable from '../../../Common/CustomTable';

const TransferTable: React.FC = () => {
    const {t} = useTranslation('products');

    // const navigate = useNavigate();

    // const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    //     e => {
    //         const {id} = e.currentTarget.dataset;
    //         if (id) {
    //             navigate(PRODUCTS_ROUTES.details.replace(':id', id));
    //         }
    //     },
    //     [navigate]
    // );

    const columns = useMemo<ColumnsType<IDataType>>(() => getTableColumns(t), [t]);

    const data = useMemo<IDataType[]>(() => PRODUCT_TRANSFER_ITEMS, []);

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'radio',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
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
            dataSource={data}
            scroll={{x: true}}
            tableLayout="fixed"
            size="small"
            bordered
            pagination={{}}
        />
    );
};

export default TransferTable;
