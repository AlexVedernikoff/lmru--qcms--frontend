import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState} from '../../../../store/index';
import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, Input, RegularButton, DatePicker, Typography} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import {IManagementNomenclature, IModelNomenclature, IProvidersParams} from '../../../../common/types/providers';
import {setSuppliersFilter, ISuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';

interface Props {
    loadProvidersList: (value: IProvidersParams) => void;
    modelNomenclature: IModelNomenclature | undefined;
    managementNomenclature: IManagementNomenclature | undefined;
}

const ProvidersFilter: React.FC<Props> = props => {
    const {t} = useTranslation('providers');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);
    const [filter, setFilter] = useState<string>();
    const [inputFilter, setInputFilter] = useState<string>();
    const {loadProvidersList, modelNomenclature} = props;
    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const [searchBy, setSearchBy] = useState<IProvidersParams['searchBy']>({});

    const updateRequestPayload = {
        pageIndex: 5,
        pageSize: 2,
        searchBy: {
            [String(filter)]: inputFilter,
            ...searchBy,
        },
    };

    const keys = ['modelDepartmentId', 'modelSubDepartmentId', 'modelConsolidationId', 'modelCodeId'];
    const initialAcc = keys.reduce((acc: any, key) => {
        acc[key] = [];
        return acc;
    }, {});

    const handleFiltersAdditional: (newValue: string[]) => void = newValue => {
        const newFilters = newValue.reduce((acc: any, el: any) => {
            const [key, value] = el.split(' ');

            if (!acc[key]) acc[key] = [];
            acc[key].push(value);
            return acc;
        }, initialAcc);

        setSearchBy(filters => ({
            ...filters,
            ...newFilters,
        }));
    };

    const handleSelect = () => {
        // const value = e.target.value;
        // setFilter(value);
    };

    const resetFilters = () => {
        setInputFilter(undefined);
        setFilter(undefined);
        setSearchBy(undefined);
    };

    // ********************************************************************************* //

    const dispatch = useDispatch();
    const onHandleFilterChange = (e: ISuppliersFilter[keyof ISuppliersFilter], k: string) => {
        dispatch(setSuppliersFilter([e, k]));
    };

    const suppliersFilterState: ISuppliersFilter = useSelector((state: TRootState) => state.suppliersFilter);

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
                        onSelect={e => onHandleFilterChange(e!, ' supplierDepartmentCountry')}
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
                        handleFiltersAdditional={handleFiltersAdditional}
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
                    <RegularButton onClick={resetFilters} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton onClick={() => loadProvidersList(updateRequestPayload)} size="m" variant="primary">
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProvidersFilter;
