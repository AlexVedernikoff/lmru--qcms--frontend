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
import {IProvidersResponse} from '../../../../common/types/providers';
import {setSuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';
import {TRootState} from '../../../../store/index';
import {ISearchSuppliersResponse, ISuppliersContent} from '../../../../common/types/searchSuppliers';

interface Props {
    providers: IProvidersResponse | undefined; // IProviderTableItem[]
}
export type RawTable = Pick<ISuppliersContent, 'supplierName' | 'supplierRMSCode' | 'id'>;

const ProvidersTable: React.FC<Props> = props => {
    const navigate = useNavigate();
    const {t} = useTranslation('providers');
    const dispatch = useDispatch();
    // *****************************************************************
    const suppliersTableData: ISearchSuppliersResponse = useSelector((state: TRootState) => state.suppliersTableData);
    // *****************************************************************
    const providers = suppliersTableData;
    const {pageable} = providers || {};

    let rawTable = providers?.content.map((el, i) => {
        let raw = {supplierName: el.supplierName, supplierRMSCode: el.supplierRMSCode, id: el.id, key: i};
        return raw;
    });

    const handleViewProviderDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(PROVIDER_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const onPageChange = (page: number) => {
        dispatch(
            setSuppliersFilter([
                {
                    ...pageable,
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
                width: 64,
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

    const data = useMemo<RawTable[] | undefined>(() => rawTable, [rawTable]);

    const rowSelection = useMemo<TableRowSelection<RawTable>>(
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
