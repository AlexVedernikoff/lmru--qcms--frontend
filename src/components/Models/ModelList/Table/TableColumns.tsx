import {Grid, Label, Typography} from 'fronton-react';
import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IModelTableItem} from '../../../../common/models';
import NomenclatureRow from '../../Common/NomenclatureRow';

export interface IDataType extends IModelTableItem {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'models', undefined, 'models'>): ColumnsType<IDataType> => [
    {
        title: t('ModelList.Table.Columns.modelStatus'),
        dataIndex: 'modelStatus',
        render: (data: IDataType['modelStatus']) => <div>{data}</div>,
        width: 246,
    },
    {
        title: t('ModelList.Table.Columns.modelCode'),
        dataIndex: 'modelCode',
        render: (data: IDataType['modelCode']) => <div>{data}</div>,
        width: 246,
    },
    {
        title: t('ModelList.Table.Columns.qualityModel'),
        dataIndex: 'qualityModel',
        render: (data: IDataType['qualityModel']) => <div>{data}</div>,
        width: 246,
    },
    {
        title: t('ModelList.Table.Columns.QE'),
        dataIndex: 'QE',
        render: (data: IDataType['QE']) => (
            <Grid>
                {data.map((d, i) => (
                    <Grid key={i} columns="36px 1fr" columnGap="12px" alignItems="center">
                        <Label background="success-light">{d.type}</Label>
                        <Typography variant="s" size="body_long">
                            {d.fullName}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        ),
        width: 246,
    },
    {
        title: t('ModelList.Table.Columns.nomenclature'),
        dataIndex: 'nomenclature',
        render: (data: IDataType['nomenclature']) => <NomenclatureRow data={data} />,
        width: 500,
    },
    {
        title: t('ModelList.Table.Columns.latestChange'),
        dataIndex: 'latestChange',
        render: (data: IDataType['latestChange']) => <div>{data}</div>,
        width: 246,
    },
    {
        title: t('ModelList.Table.Columns.changeDate'),
        dataIndex: 'changeDate',
        render: (data: IDataType['changeDate']) => <div>{data}</div>,
        width: 246,
    },
];
