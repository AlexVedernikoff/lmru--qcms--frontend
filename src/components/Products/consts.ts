import {ITableItem} from './models';

type TKey = keyof ITableItem;

interface ITableFields {
    field: TKey;
    label: string;
}

export const TableFields: Record<TKey, ITableFields> = {
    providerStatus: {
        field: 'providerStatus',
        label: 'Статус поставщика',
    },
    productCode: {
        field: 'productCode',
        label: 'Код товара',
    },
    productName: {
        field: 'productName',
        label: 'Наименование товара',
    },
    providerCode: {
        field: 'providerCode',
        label: 'Код поставщика',
    },
    providerName: {
        field: 'providerName',
        label: 'Наименование поставщика',
    },
    qualityStatus: {
        field: 'qualityStatus',
        label: 'Статус качества',
    },
};
