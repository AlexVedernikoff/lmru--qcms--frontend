import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown, DropdownItem, Grid, RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {PRODUCT_TABLE_WITH_DOCUMENTS} from '../../../../common/mocks';
import {IDataType, getProductTableColumns} from './ProductTableColumns';
import CustomTable from '../../../Common/CustomTable';
import {usePostSearchQualityDocsMutation} from '../../../../api/postSearchQualityDocuments';

const DocumentsTable: React.FC = () => {
    const productsDocuments = useSelector((state: any) => state.productsDocumentsTableData.content);
    console.log('productsDocuments = ', productsDocuments);

    const data = useMemo<IDataType[]>(
        () =>
            productsDocuments?.map((el: any) => {
                return {
                    key: el.id,
                    documentNumber: el.id,
                    type: el.type,
                    productCode: el.productsDetails[0]?.productCode || ' ',
                    EAN: el.productsDetails[0]?.ean || ' ',
                    TNVED: el.productsDetails[0]?.productTNVEDCode || ' ',
                    name: el.productsDetails[0]?.productTNVEDCode || ' ',
                    releaseDate: el.issueDate || ' ',
                    endDate: el.expireDate || ' ',
                    status: el.status,
                    confirmationStatus: el.productsDetails[0]?.approvingStatus || ' ',
                    uploadDate: el.creationInformation.createdAt || ' ',
                    nameSupplier: el.productsDetails[0]?.supplierName || ' ',
                    supplieroCodeRMS: el.productsDetails[0]?.supplierRMSCode || ' ',
                    INN: el.productsDetails[0]?.supplierTaxIdentifier || ' ',
                    businessLicenseNumber: 0,
                    SSMCode: 0,
                    role: el.creationInformation.createdBy.Role || ' ',
                    downloadCompleted: el.creationInformation.createdBy || ' ',
                };
            }),
        [productsDocuments]
    );

    console.log('data = ', data);

    const {t} = useTranslation('products');
    const handleSelect = (value: string | null) => {};

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.productCode.toString()}
                        onClick={() => {}}
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
            ...getProductTableColumns(t),
        ],
        [t]
    );

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
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
        <>
            <Grid columns="5fr 3fr 1fr" columnGap={20}>
                <br />
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('Common.Actions')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
                <RegularButton onClick={() => {}} size="m" variant="primary">
                    {t('Buttons.Make')}
                </RegularButton>
            </Grid>
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
        </>
    );
};

export default DocumentsTable;
