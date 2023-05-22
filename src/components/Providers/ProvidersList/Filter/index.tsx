import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, Input, RegularButton, DatePicker, Typography} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';

const ProvidersFilter: React.FC = () => {
    const {t} = useTranslation('providers');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('ProvidersList.Filters.providerName')}
                        label={t('ProvidersList.Filters.filter')}
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
                        label=""
                        placeholder=""
                        value="ООО Ромашка"
                        onChange={handleInputChange}
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

                    <DatePicker onChange={() => { }}
                        datePlaceholder='ДД/ММ/ГГГГ -ДД/ММ/ГГГГ'
                        label={t('ProvidersList.Filters.dates')}
                        dateMask={"ДД/ММ/ГГГГ -ДД/ММ/ГГГГ"}
                        />

                    <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                        <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                            <Checkbox checked={false} label={t("Common.Yes")} />
                            <Checkbox checked={false} label={t("Common.No")} />
                        </Grid>
                        <Typography variant="s" size="body_short">
                            {t('ProvidersList.Filters.withoutIQ')}
                        </Typography>
                    </Grid>

                    <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                        <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                            <Checkbox checked={false} label={t("Common.Yes")} />
                            <Checkbox checked={false} label={t("Common.No")} />
                        </Grid>
                        <Typography variant="s" size="body_short">
                            {t('ProvidersList.Filters.withoutAssignedQE')}
                        </Typography>
                    </Grid>
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
                    <RegularButton onClick={() => {}} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton onClick={() => {}} size="m" variant="primary">
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProvidersFilter;
