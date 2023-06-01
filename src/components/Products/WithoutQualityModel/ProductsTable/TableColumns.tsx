import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProductTableWithoutModelsItem} from '../../../../common/clientModels';

export interface IDataType extends IProductTableWithoutModelsItem {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'products', undefined, 'products'>): ColumnsType<IDataType> => [
    {
        title: t('WithoutModels.Table.Columns.providerCodeNumber'),
        dataIndex: 'providerCodeNumber',
        width: 240,
    },
    {
        title: t('WithoutModels.Table.Columns.productCode'),
        dataIndex: 'productCode',
        width: 240,
    },
    {
        title: t('WithoutModels.Table.Columns.productName'),
        dataIndex: 'productName',
        width: 380,
    },
    {
        title: t('WithoutModels.Table.Columns.params'),
        dataIndex: 'params',
        width: 690,
        render: (text: string = '') => (
            <ul>
                {text
                    .trimStart()
                    .trimEnd()
                    .split('\n')
                    .map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
            </ul>
        ),
    },
];
