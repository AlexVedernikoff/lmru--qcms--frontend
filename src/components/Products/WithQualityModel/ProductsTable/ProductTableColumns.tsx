import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProductTableWithModelsItem} from '../../../../common/models';

export interface IDataType extends IProductTableWithModelsItem {
    key: React.Key;
}

export const getProductTableColumns = (t: TFunction<'products', undefined, 'products'>): ColumnsType<IDataType> => [
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
];
