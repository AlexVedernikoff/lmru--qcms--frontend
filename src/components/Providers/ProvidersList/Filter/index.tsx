import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState, useAppSelector} from '../../../../store/index';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import {setSuppliersFilter, ISuppliersFilter, initialState} from '../../../../store/slices/suppliersFilterSlice';
import {prepareBody} from './prepareBody';
import {usePostSearchSupplsMutation} from '../../../../api/postSearchSuppliers';
import {setSuppliersTableData, setSuppliersLoading} from '../../../../store/slices/suppliersTableDataSlice';
import {EUserRole} from 'common/roles';

const ProvidersFilter: React.FC = () => {
    const {t} = useTranslation('providers');
    const dispatch = useDispatch();
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);
    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };
    const userData = useAppSelector(store => store.userStore.userData!);
    const hasUserEditFiltersPermission =
        userData.roles.includes(EUserRole.Admin) ||
        userData.roles.includes(EUserRole.KeyUser) ||
        userData.roles.includes(EUserRole.QE) ||
        userData.roles.includes(EUserRole.SQM) ||
        userData.roles.includes(EUserRole.InternalUser);
    const onHandleFilterChange = (e: ISuppliersFilter[keyof ISuppliersFilter], k: string) => {
        dispatch(setSuppliersFilter([e, k]));
    };

    const clearFilters = (initialState: ISuppliersFilter) => {
        for (const key in initialState) {
            onHandleFilterChange(initialState[key as keyof ISuppliersFilter], key);
        }
    };

    const suppliersFilterState: ISuppliersFilter = useSelector((state: TRootState) => state.suppliersFilter);
    const [getProviders, {isLoading}] = usePostSearchSupplsMutation();
    if (isLoading) dispatch(setSuppliersLoading(isLoading));

    const {pageIndex: currentPage, pageSize} = suppliersFilterState.pageable;

    useEffect(() => {
        receiveProviders();
        // eslint-disable-next-line
    }, [currentPage, pageSize]);

    const receiveProviders = async () => {
        const requestBody = prepareBody(suppliersFilterState);

        const providersTableData = userData.roles.includes(EUserRole.Supplier)
            ? await getProviders({
                  ...requestBody,
                  searchBy: {...requestBody.searchBy, supplierRMSCode: userData.supplierCommercialIds},
              })
            : await getProviders(requestBody);

        dispatch(setSuppliersTableData({...providersTableData, isLoading}));
    };

    const {supplierKey, supplierValue, registrationStatus, billingCountry, supplierDepartmentCountry} =
        suppliersFilterState;

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Grid rowGap="7px">
                        {/**************** Фильтр 01 "Поставщик код/ИНН/имя" *****************/}
                        <Dropdown
                            size="m"
                            closeOnSelect
                            placeholder={t('Common.Select')}
                            label={t('ProvidersList.Filters.filter')}
                            value={supplierKey}
                            onSelect={e => onHandleFilterChange(e!, 'supplierKey')}
                            disabled={!hasUserEditFiltersPermission}
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
                            disabled={!supplierKey || !hasUserEditFiltersPermission}
                            onChange={e => {
                                onHandleFilterChange(e.target.value, 'supplierValue');
                            }}
                        />
                    </Grid>
                    {/**************** Фильтр 02 "Статус регистрации поставщика" *****************/}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.supplierRegistrationStatus')}
                        value={registrationStatus}
                        onSelect={e => onHandleFilterChange(e!, 'registrationStatus')}
                        disabled={!hasUserEditFiltersPermission}
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
                        label={t('ProvidersList.Filters.billingCountry.label')}
                        value={billingCountry}
                        onSelect={e => onHandleFilterChange(e!, 'billingCountry')}
                        disabled={!hasUserEditFiltersPermission}
                    >
                        <DropdownItem text={t('ProvidersList.Filters.billingCountry.Russia')} value={'Russia'} />
                    </Dropdown>

                    {/***** Фильтр 04 Страна расположения отделения поставщика" *****************/}

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.countryLocationSupplier.label')}
                        value={supplierDepartmentCountry}
                        onSelect={e => onHandleFilterChange(e!, 'supplierDepartmentCountry')}
                        disabled={!hasUserEditFiltersPermission}
                    >
                        <DropdownItem
                            text={t('ProvidersList.Filters.countryLocationSupplier.Russia')}
                            value={'Russia'}
                        />
                    </Dropdown>
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
                    <AdditionalFilter />
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
                        }}
                        size="m"
                        variant="outline"
                        disabled={!hasUserEditFiltersPermission}
                    >
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton
                        onClick={() => {
                            receiveProviders();
                        }}
                        size="m"
                        variant="primary"
                        disabled={!hasUserEditFiltersPermission}
                    >
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProvidersFilter;
