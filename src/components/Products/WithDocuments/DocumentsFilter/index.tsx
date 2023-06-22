import {useState, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {DatePicker, Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import DocumentsAdditionalFilter from './DocumentsAdditionalFilter';
import {
    setProductsDocumentsFilters,
    initialState,
    IFilters,
    EDateType,
} from '../../../../store/slices/productsDocumentsSlice';
import {useGetPermissiveDocsQuery} from '../../../../api/getPermissiveDocuments';
import {usePostSearchQualityDocsMutation} from '../../../../api/postSearchQualityDocuments';
import {IPermissiveDocumentsResponse} from '../../../../common/types/permissiveDocuments';
import {setProductsDocumentsTableData} from '../../../../store/slices/productsDocumentsTableDataSlice';
import {TRootState} from '../../../../store/index';
import styles from '../../../Common.module.css';
import {prepareBody} from './prepareBody';

const DocumentsFilter: React.FC = () => {
    const dispatch = useDispatch();
    const onHandleFilterChange = (e: IFilters[keyof IFilters], k: string) => {
        dispatch(setProductsDocumentsFilters([e, k]));
    };

    const clearFilters = (initialState: IFilters) => {
        for (const key in initialState) {
            onHandleFilterChange(initialState[key as keyof IFilters], key);
        }
    };

    const productsDocumentsFiltersState: IFilters = useSelector((state: TRootState) => state.productsDocumentsFilters);

    const {data: permissiveDocuments = []} = useGetPermissiveDocsQuery(true);
    const [qualityDocuments] = usePostSearchQualityDocsMutation();

    const receiveQualityDocuments = async () => {
        // * Временно отправляем requestBody без фильтров из-за правок на бэкенде *
        const requestBody = prepareBody(productsDocumentsFiltersState);
        // const requestBody = {
        //     pageIndex: 0,
        //     pageSize: 1,
        //     // sortField: 'string',
        //     sortDirection: 'ASC',
        //     searchBy: {},
        // };

        const productsDocumentsTableData = await qualityDocuments(requestBody);

        dispatch(setProductsDocumentsTableData(productsDocumentsTableData));
    };
    let documentsTypes = useMemo(
        () => Array.from(new Set(permissiveDocuments.map((el: IPermissiveDocumentsResponse) => el.type))),
        [permissiveDocuments]
    );

    // documentsTypes = Array.from(new Set(documentsTypes));

    // useEffect(() => {
    //     onHandleFilterChange(documentsTypes[0], 'documentType');
    // }, [documentsTypes.length]);

    const List = documentsTypes.map(el => {
        return <DropdownItem text={el} value={el} key={el} />;
    });

    const {t} = useTranslation('products');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const {approvingStatus, regulatoryStatus, type, fileName, status, dates} = productsDocumentsFiltersState;

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    {/**************** Фильтр 01 "Код товара" *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.productNumberKey')}
                        value={productsDocumentsFiltersState.productNumberKey}
                        onSelect={e => onHandleFilterChange(e!, 'productNumberKey')}
                    >
                        <DropdownItem text={t('WithDocuments.Table.ProductCode')} value={'productCode'} />
                        <DropdownItem text={t('WithDocuments.Table.EAN')} value={'ean'} />
                        <DropdownItem text={t('WithDocuments.Table.TNVED')} value={'productTNVEDcode'} />
                        <DropdownItem text={t('WithDocuments.Table.Name')} value={'productDescription'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filter'}
                        value={productsDocumentsFiltersState.productNumberValue}
                        onChange={e => {
                            onHandleFilterChange(e.target.value, 'productNumberValue');
                        }}
                    />

                    {/**************** Фильтр 02 "Поставщик" *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.supplierName')}
                        value={productsDocumentsFiltersState.supplierNameKey}
                        onSelect={e => onHandleFilterChange(e!, 'supplierNameKey')}
                    >
                        <DropdownItem text={t('WithDocuments.Table.SupplierName')} value={'supplierName'} />
                        <DropdownItem text={t('WithDocuments.Table.SupplierCodeRMS')} value={'supplierRMSCode'} />
                        <DropdownItem
                            text={t('WithDocuments.Table.SupplierTaxIndetifier')}
                            value={'supplierTaxIdentifer'}
                        />
                        <DropdownItem
                            text={t('WithDocuments.Table.BusinessLicenseNumber')}
                            value={'supplierBusinessLicense'}
                        />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filter'}
                        value={productsDocumentsFiltersState.supplierNameValue}
                        onChange={e => {
                            onHandleFilterChange(e.target.value, 'supplierNameValue');
                        }}
                    />
                    {/**************** Фильтр 03 "Регуляторный статус" *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.RegulatoryStatus')}
                        value={regulatoryStatus ? regulatoryStatus[0] : undefined}
                        onSelect={e => onHandleFilterChange([e!], 'regulatoryStatus')}
                    >
                        <DropdownItem text={t('WithDocuments.Table.IMPORTER')} value={'IMPORTER'} />
                        <DropdownItem text={t('WithDocuments.Table.MANUFACTURER')} value={'MANUFACTURER'} />
                        <DropdownItem text={t('WithDocuments.Table.SUPPLIER')} value={'SUPPLIER'} />
                    </Dropdown>
                </Grid>

                {/**************** Фильтр "04 Тип документа" *****************/}

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={documentsTypes.length ? t('Common.Select') : 'Загрузка данных'}
                        label={t('WithDocuments.Filters.DocumentType')}
                        value={type ? type[0] : undefined}
                        onSelect={e => onHandleFilterChange([e as string], 'type')}
                    >
                        <ul>{List}</ul>
                    </Dropdown>

                    {/**************** Фильтр "05 имя файла fileName" *****************/}

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('WithDocuments.Filters.FileName')}
                        name={'qualityModel'}
                        placeholder=""
                        value={fileName}
                        onChange={e => {
                            onHandleFilterChange(e.target.value, 'fileName');
                        }}
                    />
                    {/**************** Фильтр "06 Статус документа " *****************/}

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.DocumentStatus')}
                        value={status ? status[0] : undefined}
                        onSelect={e => onHandleFilterChange([e!], 'status')}
                    >
                        <DropdownItem text={t('WithDocuments.Table.ACTIVE')} value={'ACTIVE'} />
                        <DropdownItem text={t('WithDocuments.Table.INACTIVE')} value={'INACTIVE'} />
                    </Dropdown>
                </Grid>

                {/**************** Фильтр "07 Статус соответствия " *****************/}

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.ComplianceStatus')}
                        value={approvingStatus ? approvingStatus[0] : undefined}
                        onSelect={e => onHandleFilterChange([e!], 'approvingStatus')}
                    >
                        <DropdownItem text={t('WithDocuments.Table.APPROVED')} value={'APPROVED'} />
                        <DropdownItem text={t('WithDocuments.Table.REJECTED')} value={'REJECTED'} />
                        <DropdownItem text={t('WithDocuments.Table.NEEDS_APPROVAL')} value={'NEEDS_APPROVAL'} />
                    </Dropdown>
                    {/**************** Фильтр "08 Поиск по дате " *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.DateSearch')}
                        value={dates.dateType}
                        onSelect={e => {
                            const dateType = e as EDateType;
                            onHandleFilterChange({...dates, dateType}, 'dates');
                        }}
                    >
                        <DropdownItem text={t('WithDocuments.Table.CREATED')} value={'createDate'} />
                        <DropdownItem text={t('WithDocuments.Table.UPDATED')} value={'updateDate'} />
                        <DropdownItem text={t('WithDocuments.Table.ISSUE')} value={'issueDate'} />
                        <DropdownItem text={t('WithDocuments.Table.EXPIRY')} value={'expireDate'} />
                    </Dropdown>
                    <div>
                        <DatePicker
                            date={[
                                productsDocumentsFiltersState.dates.startDate,
                                productsDocumentsFiltersState.dates.endDate,
                            ]}
                            mode="range"
                            view="double"
                            onChange={function noRefCheck(e) {
                                const datesArr = [dates.startDate, dates.endDate];
                                const datesArrRemoveEmpty = datesArr.filter(el => el);

                                if (datesArrRemoveEmpty.length < 2) {
                                    datesArrRemoveEmpty.push(e.slice(-1)[0]);
                                } else {
                                    datesArrRemoveEmpty.splice(0, datesArrRemoveEmpty.length);
                                    datesArrRemoveEmpty.push(e[0]);
                                }

                                datesArrRemoveEmpty.sort();
                                onHandleFilterChange(
                                    {
                                        ...dates,
                                        startDate: datesArrRemoveEmpty[0],
                                        endDate: datesArrRemoveEmpty[1],
                                    },
                                    'dates'
                                );
                            }}
                        />
                    </div>
                </Grid>
            </Grid>

            {isMoreFiltersActive && (
                <Grid columnGap={16} columns="1fr" alignItems="center">
                    <DocumentsAdditionalFilter />
                </Grid>
            )}

            <Grid columnGap={16} columns="repeat(6, 1fr)" alignItems="baseline">
                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton
                        onClick={handleShowMoreFiltersClick}
                        size="m"
                        variant="pseudo"
                        iconLeft={isMoreFiltersActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    >
                        {isMoreFiltersActive ? t('Buttons.Less') : t('Buttons.More')}
                    </RegularButton>
                </Grid>

                <span />
                <span />
                <span />
                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={() => clearFilters(initialState)} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton
                        onClick={() => {
                            receiveQualityDocuments();
                        }}
                        size="m"
                        variant="primary"
                    >
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DocumentsFilter;
