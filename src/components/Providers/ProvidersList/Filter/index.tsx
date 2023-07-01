import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState} from '../../../../store/index';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import {IManagementNomenclature, IModelNomenclature, IProvidersParams} from '../../../../common/types/providers';
import {setSuppliersFilter, ISuppliersFilter, initialState} from '../../../../store/slices/suppliersFilterSlice';
import {prepareBody} from './prepareBody';
import {usePostSearchSupplsMutation} from '../../../../api/postSearchSuppliers';
import {setSuppliersTableData} from '../../../../store/slices/suppliersTableDataSlice';

interface Props {
    loadProvidersList: (value: IProvidersParams) => void;
    modelNomenclature: IModelNomenclature | undefined;
    managementNomenclature: IManagementNomenclature | undefined;
}

const ProvidersFilter: React.FC<Props> = props => {
    const {t} = useTranslation('providers');
    const dispatch = useDispatch();
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);
    const {loadProvidersList, modelNomenclature} = props;
    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const onHandleFilterChange = (e: ISuppliersFilter[keyof ISuppliersFilter], k: string) => {
        dispatch(setSuppliersFilter([e, k]));
    };

    const clearFilters = (initialState: ISuppliersFilter) => {
        for (const key in initialState) {
            onHandleFilterChange(initialState[key as keyof ISuppliersFilter], key);
        }
    };

    const suppliersFilterState: ISuppliersFilter = useSelector((state: TRootState) => state.suppliersFilter);
    const [getProviders] = usePostSearchSupplsMutation();

    const currentPage = suppliersFilterState.pageable.pageIndex;

    const requestBody = prepareBody(suppliersFilterState);

    useEffect(() => {
        receiveProviders();
        // eslint-disable-next-line
    }, [currentPage]);

    const receiveProviders = async () => {
        const requestBody = prepareBody(suppliersFilterState);
        // console.log('requestBody= ', requestBody);
        const providersTableData = await getProviders(requestBody);
        dispatch(setSuppliersTableData(providersTableData));
    };

    const {supplierKey, supplierValue, registrationStatus, billingCountry, supplierDepartmentCountry} =
        suppliersFilterState;

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    {/**************** Фильтр 01 "Поставщик код/ИНН/имя" *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.filter')}
                        value={supplierKey}
                        onSelect={e => onHandleFilterChange(e!, 'supplierKey')}
                    >
                        <DropdownItem text={t('ProvidersList.Filters.providerName')} value={'supplierName'} />
                        <DropdownItem text={t('ProvidersList.Filters.providerCode')} value={'supplierRMSCode'} />
                        <DropdownItem text={t('ProvidersList.Filters.INN')} value={'supplierInn'} />
                        <DropdownItem
                            text={t('ProvidersList.Filters.businessLicenseNumber')}
                            value={'businessLicence'}
                        />
                    </Dropdown>
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label=""
                        placeholder=""
                        value={supplierValue}
                        disabled={!supplierKey}
                        onChange={e => {
                            onHandleFilterChange(e.target.value, 'supplierValue');
                        }}
                    />
                    {/**************** Фильтр 02 "Статус регистрации поставщика" *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.supplierRegistrationStatus')}
                        value={registrationStatus}
                        onSelect={e => onHandleFilterChange(e!, 'registrationStatus')}
                    >
                        <DropdownItem text="Возможное значение 1" value={'Возможное значение 1'} />
                        <DropdownItem text="Возможное значение 2" value={'Возможное значение 2'} />
                        <DropdownItem text="Возможное значение 3" value={'Возможное значение 3'} />
                    </Dropdown>

                    {/**************** Фильтр 03 Страна выставления счетов" *****************/}

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.billingCountry')}
                        value={billingCountry}
                        onSelect={e => onHandleFilterChange(e!, 'billingCountry')}
                    >
                        <DropdownItem text="Россия" value={'Russia'} />
                    </Dropdown>

                    {/***** Фильтр 04 Страна расположения отделения поставщика" *****************/}

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.countryLocationSupplier')}
                        value={supplierDepartmentCountry}
                        onSelect={e => onHandleFilterChange(e!, 'supplierDepartmentCountry')}
                    >
                        <DropdownItem text="Россия" value={'Russia'} />
                    </Dropdown>

                    {/* <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ProvidersList.Filters.countryLocationSupplier')}
                        name={'modelNameOrCode'}
                        placeholder={t('Common.Input')}
                        value={undefined}
                        onChange={handleInputChange}
                    /> */}

                    {/* 
// 
// 
// 
// 
 */}
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    {/* <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.platform')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown> */}
                    {/* 
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.SQMResponsibleSelfAssessment')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown> */}

                    {/* <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.qualityManager')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown> */}
                    {/* 
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.country')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown> */}
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                    {/* <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.qualityAssessment')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.assessmentQualityTechnicalAudit')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.environmentalAuditQualityAssessment')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.dateSearch')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <DatePicker
                        onChange={() => {}}
                        datePlaceholder="ДД/ММ/ГГГГ -ДД/ММ/ГГГГ"
                        label={t('ProvidersList.Filters.dates')}
                        dateMask={'ДД/ММ/ГГГГ -ДД/ММ/ГГГГ'}
                    />

                    <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                        <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                            <Checkbox checked={false} label={t('Common.Yes')} />
                            <Checkbox checked={false} label={t('Common.No')} />
                        </Grid>
                        <Typography variant="s" size="body_short">
                            {t('ProvidersList.Filters.withoutIQ')}
                        </Typography>
                    </Grid>

                    <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                        <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                            <Checkbox checked={false} label={t('Common.Yes')} />
                            <Checkbox checked={false} label={t('Common.No')} />
                        </Grid>
                        <Typography variant="s" size="body_short">
                            {t('ProvidersList.Filters.withoutAssignedQE')}
                        </Typography> 
                     </Grid> */}
                </Grid>
            </Grid>

            {isMoreFiltersActive && (
                <Grid columnGap={16} columns="1fr" alignItems="center">
                    <AdditionalFilter
                        modelNomenclature={modelNomenclature}
                        // handleFiltersAdditional={handleFiltersAdditional}
                    />
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
                    <RegularButton
                        onClick={() => {
                            clearFilters(initialState);
                            loadProvidersList(requestBody);
                        }}
                        size="m"
                        variant="outline"
                    >
                        {t('Buttons.Clear')}
                    </RegularButton>

                    {/* <RegularButton
                        onClick={() => {
                            loadProvidersList(requestBody);
                        }}
                        size="m"
                        variant="primary"
                    >
                        {t('Buttons.Search')}
                    </RegularButton> */}

                    <RegularButton
                        onClick={() => {
                            receiveProviders();
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

export default ProvidersFilter;
