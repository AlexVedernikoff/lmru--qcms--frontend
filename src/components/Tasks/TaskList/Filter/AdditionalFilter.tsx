import {Checkbox, DatePickerRange, Dropdown, DropdownItem, Grid, Typography} from 'fronton-react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';

const AdditionalFilter: React.FC = () => {
    const {t} = useTranslation('tasks');

    const handleSelect = (value: string | null) => {};

    const renderDropdown = useCallback(
        (text: string) => (
            <Dropdown
                size="m"
                closeOnSelect
                placeholder={t('Common.Select')}
                label={text}
                value={undefined}
                onSelect={handleSelect}
            >
                <DropdownItem text="test" value={'test'} />
            </Dropdown>
        ),
        [t]
    );

    const renderCheckbox = useCallback(
        (text: string) => (
            <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="center">
                <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="center" alignContent="center">
                    <Checkbox checked={false} label={t('Common.Yes')} />
                    <Checkbox checked={false} label={t('Common.No')} />
                </Grid>
                <Typography variant="s" size="body_short">
                    {text}
                </Typography>
            </Grid>
        ),
        [t]
    );

    return (
        <Grid columnGap={24} columns="repeat(3, 1fr)" alignItems="baseline">
            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.qualityStatus'))}
                {renderDropdown(t('TaskList.Filters.regularStatus'))}
                {renderDropdown(t('TaskList.Filters.qualityModel'))}
                {renderDropdown(t('TaskList.Filters.characteristics'))}
                {renderDropdown(t('TaskList.Filters.characteristicValue'))}
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.gamma'))}
                {renderCheckbox(t('TaskList.Filters.fromProject'))}
                {renderCheckbox(t('TaskList.Filters.withProviderActiveLink'))}
                {renderCheckbox(t('TaskList.Filters.withoutTransfer'))}
                {renderCheckbox(t('TaskList.Filters.containsSubstanceLimit'))}
                {renderDropdown(t('TaskList.Filters.containsSubstance'))}

                <CustomSwitch
                    checked={false}
                    handleChange={() => {}}
                    name={t('TaskList.Filters.withoutQualityManager')}
                />
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.searchByDate'))}
                <DatePickerRange onChange={() => {}} label={t('TaskList.Filters.dates')} size="s" />
                {renderDropdown(t('TaskList.Filters.country'))}
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
