import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PROVIDER_ROUTES} from '../../../../common/consts';
import {getProviderTableColumns} from './TableColumns';
import CustomTable from '../../../Common/CustomTable';
import {setSuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';
import {TRootState} from '../../../../store/index';
import {ISearchSuppliersResponse, ISuppliersContent} from '../../../../common/types/searchSuppliers';

export type RawTable = Pick<ISuppliersContent, 'supplierName' | 'supplierRMSCode' | 'id'>;

const ProvidersTable: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation('providers');
    const dispatch = useDispatch();

    const suppliersTableData: ISearchSuppliersResponse = useSelector((state: TRootState) => state.suppliersTableData);

    const {content: providers, pageable} = suppliersTableData || {};

    const data = useMemo<RawTable[]>(
        () =>
            providers?.map((el, i) => {
                return {supplierName: el.supplierName, supplierRMSCode: el.supplierRMSCode, id: el.id, key: i};
            }),
        [providers]
    );

    const handleViewProviderDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(PROVIDER_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const onPageChange = (page: number, size: number) => {
        dispatch(
            setSuppliersFilter([
                {
                    ...pageable,
                    pageSize: size,
                    pageIndex: page - 1,
                },
                'pageable',
            ])
        );
    };

    const columns = useMemo<ColumnsType<RawTable>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 35,
                render: (_value: string, record: RawTable) => (
                    <RegularButton
                        data-id={record.id?.toString()}
                        onClick={handleViewProviderDetails}
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
            ...getProviderTableColumns(t),
        ],
        [handleViewProviderDetails, t]
    );

    const rowSelection = useMemo<TableRowSelection<RawTable>>(
        () => ({
            type: 'checkbox',
            columnWidth: 35,
            onChange: (selectedRowKeys: React.Key[], selectedRows: RawTable[]) => {},
            fixed: 'left',
        }),
        []
    );

    return (
        <CustomTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
            pagination={{
                pageSize: pageable?.pageSize,
                total: pageable?.totalElements,
                current: pageable?.pageIndex ? pageable?.pageIndex + 1 : 1,
                onChange: onPageChange,
            }}
        />
    );
};

export default ProvidersTable;
