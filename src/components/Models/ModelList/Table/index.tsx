import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Grid, Label, RegularButton, Typography} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {MODELS_ROUTES} from '../../../../common/consts';
import CustomTable from '../../../Common/CustomTable';
import NomenclatureRow from '../../Common/NomenclatureRow';
import {IModelItem, IModelsResponse} from '../../../../common/types/models';
import {TWithReactKey} from '../../../../common/clientModels';

type TDataType = TWithReactKey<IModelItem>;

interface IProps {
    onPageChange: (page: number, size: number) => void;
    tableData: IModelsResponse;
    isLoading: boolean;
}

const ModelsTable: React.FC<IProps> = ({onPageChange, tableData, isLoading}) => {
    const navigate = useNavigate();
    const {t} = useTranslation('models');

    const handleDetailsOpen: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(MODELS_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns: ColumnsType<TDataType> = [
        {
            title: '',
            dataIndex: undefined,
            width: 64,
            render: (_value: string, record: TDataType) => (
                <RegularButton
                    data-id={record.id}
                    onClick={handleDetailsOpen}
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
            title: t('ModelList.Table.Columns.modelStatus'),
            dataIndex: 'qualityModelStatus',
            render: (data: TDataType['qualityModelStatus']) => <div>{data}</div>,
            width: 246,
        },
        {
            title: t('ModelList.Table.Columns.modelCode'),
            dataIndex: 'id',
            render: (data: TDataType['id']) => <div>{data}</div>,
            width: 246,
        },
        {
            title: t('ModelList.Table.Columns.qualityModel'),
            dataIndex: 'qualityModelLabel',
            render: (data: TDataType['qualityModelLabel']) => (
                <Typography variant="m" size="body_short">
                    {data}
                </Typography>
            ),
            width: 246,
        },
        {
            title: t('ModelList.Table.Columns.QE'),
            dataIndex: 'assignedApprovers',
            render: (data: TDataType['assignedApprovers'] = [], record) => (
                <Grid>
                    {data.map((d, i) => (
                        <Grid key={i} columns="36px 1fr" columnGap="12px" alignItems="center">
                            <Label background="success-light">{record.calculatedRisk}</Label>
                            <Typography variant="s" size="body_long">
                                {d.userId}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            ),
            width: 246,
        },
        {
            title: t('ModelList.Table.Columns.nomenclature'),
            dataIndex: 'productModelNomenclatureModelCode',
            render: (data: TDataType['productModelNomenclatureModelCode']) => data && <NomenclatureRow code={data} />,
            width: 500,
        },
        {
            title: t('ModelList.Table.Columns.latestChange'),
            dataIndex: 'lastUpdateInfomation',
            render: (data: TDataType['lastUpdateInfomation']) => <div>{data?.updatedBy}</div>,
            width: 246,
        },
        {
            title: t('ModelList.Table.Columns.changeDate'),
            dataIndex: 'lastUpdateInfomation',
            render: (data: TDataType['lastUpdateInfomation']) => <div>{data?.updatedAt}</div>,
            width: 246,
        },
    ];

    const dataSource = useMemo<TDataType[]>(
        () => (tableData?.content || []).map(d => ({...d, key: d.id})),
        [tableData]
    );

    const rowSelection = useMemo<TableRowSelection<TDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: TDataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            fixed: 'left',
        }),
        []
    );

    return (
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
                ...tableData?.pageable,
                onChange: onPageChange,
            }}
        />
    );
};

export default ModelsTable;
