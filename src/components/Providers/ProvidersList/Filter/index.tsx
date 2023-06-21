import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, Input, RegularButton, DatePicker, Typography} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import {IManagementNomenclature, IModelNomenclature, IProvidersParams} from '../../../../common/types/providers';

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
        pageIndex: 2,
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        // setInputFilter(value);
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

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ProvidersList.Filters.filter')}
                        value={filter}
                        onSelect={function selectValue(value) {
                            value && setFilter(value);
                        }}
                    >
                        <DropdownItem text={t('ProvidersList.Filters.providerName')} value={'supplierName'} />
                        <DropdownItem text={t('ProvidersList.Filters.providerCode')} value={'supplierCode'} />
                        <DropdownItem text={t('ProvidersList.Filters.INN')} value={'supplierTaxIndetifier'} />
                        <DropdownItem
                            text={t('ProvidersList.Filters.businessLicenseNumber')}
                            value={'businessLicenseNumber'}
                        />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label=""
                        placeholder=""
                        value={inputFilter}
                        disabled={!filter}
                        onChange={(e, value) => setInputFilter(value)}
                    />

                    <Checkbox checked={false} label={t('ProvidersList.Filters.databasePotentialSuppliers')} />
                    <Checkbox checked={false} label={t('ProvidersList.Filters.referenceDatabaseSuppliers')} />

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('ProvidersList.Filters.reference')}
                        label={t('ProvidersList.Filters.supplierRegistrationStatus')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ProvidersList.Filters.billingCountry')}
                        name={'modelNameOrCode'}
                        placeholder={t('Common.Input')}
                        value={undefined}
                        onChange={handleInputChange}
                    />

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ProvidersList.Filters.countryLocationSupplier')}
                        name={'modelNameOrCode'}
                        placeholder={t('Common.Input')}
                        value={undefined}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
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
                    </Dropdown>

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
                    </Dropdown>

                    <Dropdown
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
                    </Dropdown>

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
                    </Dropdown>
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                    <Dropdown
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
                    </Grid>
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
