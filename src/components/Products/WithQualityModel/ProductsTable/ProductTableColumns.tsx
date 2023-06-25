import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProductTableWithModelsItem} from '../../../../common/clientModels';
import {TDataType} from '.';

export interface IDataType extends IProductTableWithModelsItem {
    key: React.Key;
}

export const getProductTableColumns = (t: TFunction<'products', undefined, 'products'>): ColumnsType<TDataType> => [
    {
        title: t('WithModels.Table.Columns.providerStatus'),
        dataIndex: 'regulatoryStatus',
        render: (text: string) => <div>{text}</div>,
        width: 246,
    },
    {
        title: t('WithModels.Table.Columns.productCode'),
        dataIndex: 'code',
        width: 124,
    },
    {
        title: t('WithModels.Table.Columns.productName'),
        dataIndex: 'description',
        width: 346,
    },
    {
        title: t('WithModels.Table.Columns.providerCode'),
        dataIndex: 'supplierCode',
        width: 160,
    },
    {
        title: t('WithModels.Table.Columns.providerName'),
        dataIndex: 'supplierName',
        width: 260,
    },
    {
        title: t('WithModels.Table.Columns.qualityStatus'),
        dataIndex: 'qualityStatuses',
        width: 390,
        render: text => <div>{text[0]?.qualityStatus}</div>,
    },
    /* Additional Columns */
    {
        title: t('WithModels.Table.Columns.QE'),
        dataIndex: 'QE',
        width: 130,
    },
    {
        title: t('WithModels.Table.Columns.qualityModel'),
        dataIndex: 'qualityModelId',
        width: 245,
    },
    {
        title: t('WithModels.Table.Columns.EAN'),
        dataIndex: 'ean',
        width: 245,
    },
    {
        title: t('WithModels.Table.Columns.lastProductStatusDate'),
        dataIndex: 'lastProductStatusDate',
        width: 160,
    },
    {
        title: t('WithModels.Table.Columns.qualityModelNumber'),
        dataIndex: 'qualityModelId',
        width: 160,
    },
    {
        title: t('WithModels.Table.Columns.qualityModelManager'),
        dataIndex: 'qualityModelManager',
        width: 300,
    },
    {
        title: t('WithModels.Table.Columns.productDataCompleteness'),
        dataIndex: 'comment',
        width: 340,
    },
    {
        title: t('WithModels.Table.Columns.productTopAVS'),
        dataIndex: 'topAVS',
        width: 300,
        render: text => <div>{text.toString()}</div>,
    },
    {
        title: t('WithModels.Table.Columns.productCreationDate'),
        dataIndex: 'creationInformation',
        width: 160,
        render: text => <div>{text?.createdAt}</div>, //тестовые данные не возвращают это поле, пока сделала необязательным
    },
    {
        title: t('WithModels.Table.Columns.productActionsBy'),
        dataIndex: 'productActionsBy',
        width: 160,
    },
    {
        title: t('WithModels.Table.Columns.departmentCode'),
        dataIndex: 'productModelNomenclature',
        width: 120,
        render: text => <div>{text.modelDepartmentId}</div>,
    },
    {
        title: t('WithModels.Table.Columns.subDepartmentCode'),
        dataIndex: 'productModelNomenclature',
        width: 120,
        render: text => <div>{text.modelSubDepartmentId}</div>,
    },
    {
        title: t('WithModels.Table.Columns.TN_VED_Code'),
        dataIndex: 'customId',
        width: 120,
    },
    {
        title: t('WithModels.Table.Columns.departmentName'),
        dataIndex: 'productManagement',
        width: 300,
        render: text => <div>{text?.deparmentName}</div>,
    },
    {
        title: t('WithModels.Table.Columns.nomenclature'),
        dataIndex: 'productModelNomenclature',
        width: 1100,
        render: text => (
            <div>
                modelDepartmentId: {text.modelDepartmentId} <br />
                modelSubDepartmentId: {text.modelSubDepartmentId}
                <br />
                modelConsolidationId: {text.modelConsolidationId}
                <br />
                modelCodeId: {text.modelCodeId}
            </div>
        ),
    },
];
