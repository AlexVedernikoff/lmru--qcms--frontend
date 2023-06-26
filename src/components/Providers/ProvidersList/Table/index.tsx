import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PROVIDER_ROUTES} from '../../../../common/consts';
import {getProviderTableColumns} from './TableColumns';
import CustomTable from '../../../Common/CustomTable';
import {IProvidersResponse, IProvidersResponseItem} from '../../../../common/types/providers';

interface Props {
    providers: IProvidersResponse | undefined; // IProviderTableItem[]
}
export type RawTable = Pick<IProvidersResponseItem, 'supplierName' | 'supplierRMSCode' | 'id'>;

const ProvidersTable: React.FC<Props> = props => {
    const navigate = useNavigate();
    const {t} = useTranslation('providers');
    const {providers} = props;

    let rawTable = providers?.content.map((el, i) => {
        let raw = {supplierName: el.supplierName, supplierRMSCode: el.supplierRMSCode, id: el.id, key: i};
        return raw;
    });

    const handleViewProviderDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            console.log(`мы переходим на страницу деталей поставщиков с id = ${id}`);
            if (id) {
                navigate(PROVIDER_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<RawTable>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: RawTable) => (
                    <RegularButton
                        data-id={record.id.toString()}
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
        <CustomTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
            pagination={{}}
        />
    );
};

export default ProvidersTable;
