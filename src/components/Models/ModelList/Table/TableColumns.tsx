import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IModelTableItem} from '../../../../common/models';

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
        render: (data: IDataType['QE']) => <div>{data.map(d => `${d.type} - ${d.fullName}`)}</div>,
        width: 246,
    },
    {
        title: t('ModelList.Table.Columns.nomenclature'),
        dataIndex: 'nomenclature',
        render: (data: IDataType['nomenclature']) => <div>{data.map(d => `${d.code} - ${d.description}`)}</div>,
        width: 246,
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
