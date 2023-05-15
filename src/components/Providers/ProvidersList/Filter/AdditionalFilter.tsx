import {Checkbox, Dropdown, DropdownItem, Grid, Typography, Input, DatePicker} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from './styles.module.css';
import { useState } from 'react';

const AdditionalFilter: React.FC = () => {
    const {t} = useTranslation('providers');
    const [checked, setChecked] = useState(false);

    const handleChange = () => setChecked(!checked)
    const handleSelect = (value: string | null) => {};
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => { };

    return (
        <Grid columnGap={24} columns="repeat(4, 1fr)" alignItems="baseline">
          <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Typography variant="l" size="body_accent">{t("ProvidersList.DetailFilters.relatedProducts")}</Typography>
                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t("ProvidersList.DetailFilters.managementNomenclature")}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t("ProvidersList.DetailFilters.productModelNomenclature")}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t("ProvidersList.DetailFilters.qualityModel")}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t("ProvidersList.DetailFilters.certificationStatus")}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <div></div>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t("ProvidersList.DetailFilters.сharacteristic")}
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
                    label={t("ProvidersList.DetailFilters.meaning")}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t("Common.Yes")} />
                        <Checkbox checked={false} label={t("Common.No")} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('ProvidersList.DetailFilters.withCTMProduct')}
                    </Typography>
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t("Common.Yes")} />
                        <Checkbox checked={false} label={t("Common.No")} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('ProvidersList.DetailFilters.productDistributorOnly')}
                    </Typography>
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t("Common.Yes")} />
                        <Checkbox checked={false} label={t("Common.No")} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('ProvidersList.DetailFilters.withoutСontact')}
                    </Typography>
                </Grid>
            </Grid>

            <Grid rowGap={24} columns="fr" alignItems="baseline">
                <Typography variant="l" size="body_accent">{t("ProvidersList.DetailFilters.actions")}</Typography>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t("ProvidersList.DetailFilters.type")}
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
                    label={t("ProvidersList.DetailFilters.selfAssessmentStatus")}
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
                    label={t("ProvidersList.DetailFilters.platform")}
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
                    label={t("ProvidersList.DetailFilters.qualityEngineer")}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={24} columns="fr" alignItems="baseline">
                <div></div>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t("ProvidersList.DetailFilters.contractor")}
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

                <label htmlFor="switch" className={styles.switch }>
                    <input type="checkbox" onChange={handleChange} checked={checked} role="switch" id="switch" />
                    {t('ProvidersList.DetailFilters.PendingСreation')}
                </label>
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
