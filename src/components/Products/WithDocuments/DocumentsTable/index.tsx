import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {IDataType, getProductTableColumns} from './ProductTableColumns';
import CustomTable from '../../../Common/CustomTable';
import {setProductsDocumentsFilters} from '../../../../store/slices/productsDocumentsSlice';
import {TRootState} from '../../../../store/index';
import {IProductsDocumentsTableData} from '../../../../store/slices/productsDocumentsTableDataSlice';

const DocumentsTable = () => {
    const productsDocumentsTableData: IProductsDocumentsTableData = useSelector(
        (state: TRootState) => state.productsDocumentsTableData
    );

    const {content: productsDocuments, pageable} = productsDocumentsTableData;

    const dispatch = useDispatch();

    const onPageChange = (page: number) => {
        dispatch(
            setProductsDocumentsFilters([
                {
                    ...pageable,
                    pageIndex: page - 1,
                },
                'pageable',
            ])
        );
    };

    const data = useMemo<IDataType[]>(
        () =>
            productsDocuments?.map(el => {
                const {id, type, productsDetails, issueDate, expireDate, status, creationInformation} = el;
                const receiveData = (field: string) => {
                    return productsDetails && productsDetails[0] ? productsDetails[0][field] : 'нет данных';
                };
                return {
                    key: id,
                    documentNumber: id,
                    type: type,
                    productCode: receiveData('productCode'),
                    EAN: receiveData('ean'),
                    TNVED: receiveData('productTNVEDCode'),
                    name: receiveData('productDescription'),
                    releaseDate: issueDate || 'нет данных',
                    endDate: expireDate || 'нет данных',
                    status: status,
                    confirmationStatus: receiveData('approvingStatus'),
                    uploadDate: creationInformation.createdAt || 'нет данных',
                    nameSupplier: receiveData('supplierName'),
                    supplieroCodeRMS: receiveData('supplierRMSCode'),
                    INN: receiveData('supplierTaxIdentifier'),
                    businessLicenseNumber: 0,
                    SSMCode: 0,
                    role: creationInformation.createdBy.Role || 'нет данных',
                    downloadCompleted: creationInformation.createdBy || 'нет данных',
                };
            }),
        [productsDocuments]
    );

    const {t} = useTranslation('products');

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.productCode?.toString()}
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
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        <CustomTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
            pagination={{
                pageSize: pageable?.pageSize,
                total: pageable?.totalElements,
                current: pageable?.pageIndex + 1,
                onChange: onPageChange,
            }}
        />
    );
};

export default DocumentsTable;
