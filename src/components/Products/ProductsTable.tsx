import {useMemo} from 'react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {ITableItem} from './models';

interface IDataType extends ITableItem {
    key: React.Key;
}

const columns: ColumnsType<IDataType> = [
    {
        title: 'Статус поставщика',
        dataIndex: 'providerStatus',
        render: (text: string) => <div>{text}</div>,
    },
    {
        title: 'Код товара',
        dataIndex: 'productCode',
    },
    {
        title: 'Наименование товара',
        dataIndex: 'productName',
    },
    {
        title: 'Код поставщика',
        dataIndex: 'providerCode',
    },
    {
        title: 'Наименование поставщика',
        dataIndex: 'providerName',
    },
    {
        title: 'Статус качества',
        dataIndex: 'qualityStatus',
    },
];

const ProductsTable: React.FC = () => {
    const data = useMemo<IDataType[]>(
        () => [
            {
                key: '1',
                providerStatus: 'Дистрибьютор',
                productCode: 87334230,
                productName: 'WEBER.TON MICRO V 0000 25 KG',
                providerCode: 1000771901,
                providerName: 'ООО "ХимТоргПроект"',
                qualityStatus: 'Леруа Мерлен Россия: Предполагаемое соответствие',
            },
            {
                key: '2',
                providerStatus: 'Дистрибьютор',
                productCode: 87334230,
                productName: 'WEBER.TON MICRO V 0000 25 KG',
                providerCode: 1000771901,
                providerName: 'ООО "ХимТоргПроект"',
                qualityStatus: 'Леруа Мерлен Россия: Предполагаемое соответствие',
            },
        ],
        []
    );

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: IDataType) => ({
                disabled: record.qualityStatus === '2',
                name: record.qualityStatus,
            }),
        }),
        []
    );

    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};

export default ProductsTable;
