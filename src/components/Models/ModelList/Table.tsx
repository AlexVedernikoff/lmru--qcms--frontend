import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Grid, Label, RegularButton, Typography} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {MODELS_ROUTES} from '../../../common/consts';
import CustomTable from '../../Common/CustomTable';
import NomenclatureRow from '../Common/NomenclatureRow';
import {IModelItem, IModelsResponse} from '../../../common/types/models';
import {TWithReactKey} from '../../../common/clientModels';
import {convertDateFromServer} from '../../../utils/convertDateFromServer';
import NotFound from '../../Icons/NotFound';
import {QualityModelsSortableFields} from '../../../common/types/searchQualityModels';
import SwitchSortButton from './SwitchSortButton';
import {Sort} from '.';

type TDataType = TWithReactKey<IModelItem>;

interface IProps {
    sort?: Sort;
    onSortChange: (sortField: QualityModelsSortableFields) => void;
    onPageChange: (page: number, size: number) => void;
    tableData: IModelsResponse;
    isLoading: boolean;
}

const ModelsTable: React.FC<IProps> = ({sort, onSortChange, onPageChange, tableData, isLoading}) => {
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
            width: 57,
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
            title: (
                <Grid columns="auto auto" justifyContent="space-between" alignItems="center">
                    {t('ModelList.Table.Columns.modelStatus')}
                    <SwitchSortButton
                        currentSort={sort}
                        sortField={QualityModelsSortableFields.QualityModelStatus}
                        onClick={() => onSortChange(QualityModelsSortableFields.QualityModelStatus)}
                    />
                </Grid>
            ),
            dataIndex: 'qualityModelStatus',
            render: (data: TDataType['qualityModelStatus']) => {
                let status = null;

                switch (data) {
                    case 'APPROVED':
                        status = 'Согласован';
                        break;
                    case 'REJECTED':
                        status = 'Отклонен';
                        break;
                    case 'DRAFT':
                        status = 'Черновик';
                        break;
                }

                return status;
            },
            width: 246,
        },
        {
            title: (
                <Grid columns="auto auto" justifyContent="space-between" alignItems="center">
                    {t('ModelList.Table.Columns.modelCode')}
                    <SwitchSortButton
                        currentSort={sort}
                        sortField={QualityModelsSortableFields.Id}
                        onClick={() => onSortChange(QualityModelsSortableFields.Id)}
                    />
                </Grid>
            ),
            dataIndex: 'id',
            render: (data: TDataType['id']) => <div>{data}</div>,
            width: 246,
        },
        {
            title: (
                <Grid columns="auto auto" justifyContent="space-between" alignItems="center">
                    {t('ModelList.Table.Columns.qualityModel')}
                    <SwitchSortButton
                        currentSort={sort}
                        sortField={QualityModelsSortableFields.QualityModelLabel}
                        onClick={() => onSortChange(QualityModelsSortableFields.QualityModelLabel)}
                    />
                </Grid>
            ),
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
                        <Grid key={i} columns="auto 1fr" columnGap={8} alignItems="center">
                            <Label background="success-light">{d.role}</Label>
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
            render: (_data: TDataType['productModelNomenclatureModelCode'], record) => {
                const {
                    productModelNomenclatureDepartmentCode,
                    productModelNomenclatureSubDepartmentCode,
                    productModelNomenclatureConsolidationCode,
                    productModelNomenclatureModelCode,
                } = record;
                return (
                    <NomenclatureRow
                        code={{
                            department: productModelNomenclatureDepartmentCode,
                            subdepartment: productModelNomenclatureSubDepartmentCode,
                            consolidation: productModelNomenclatureConsolidationCode,
                            model: productModelNomenclatureModelCode,
                        }}
                    />
                );
            },
            width: 550,
        },
        {
            title: (
                <Grid columns="auto auto" justifyContent="space-between" alignItems="center">
                    {t('ModelList.Table.Columns.latestChange')}
                    <SwitchSortButton
                        currentSort={sort}
                        sortField={QualityModelsSortableFields.UpdatedBy}
                        onClick={() => onSortChange(QualityModelsSortableFields.UpdatedBy)}
                    />
                </Grid>
            ),
            dataIndex: 'lastUpdateInformation',
            render: (data: TDataType['lastUpdateInformation']) => <div>{data?.updatedBy}</div>,
            width: 246,
        },
        {
            title: (
                <Grid columns="auto auto" justifyContent="space-between" alignItems="center">
                    {t('ModelList.Table.Columns.changeDate')}
                    <SwitchSortButton
                        currentSort={sort}
                        sortField={QualityModelsSortableFields.UpdatedAt}
                        onClick={() => onSortChange(QualityModelsSortableFields.UpdatedAt)}
                    />
                </Grid>
            ),
            dataIndex: 'lastUpdateInformation',
            render: (data: TDataType['lastUpdateInformation']) => <div>{convertDateFromServer(data?.updatedAt)}</div>,
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
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            fixed: 'left',
        }),
        []
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
                        current: (tableData?.pageable?.pageIndex || 0) + 1,
                        onChange: onPageChange,
                    }}
                />
            )}
        </div>
    );
};

export default ModelsTable;
