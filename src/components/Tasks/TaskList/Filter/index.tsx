import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, RegularButton, Typography} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';

const Filter: React.FC = () => {
    const {t} = useTranslation('tasks');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

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
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap={48}>
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={24}>
                    {renderDropdown(t('TaskList.Filters.productCode'))}
                    {renderDropdown(t('TaskList.Filters.responsibleContractor'))}
                    {renderDropdown(t('TaskList.Filters.QE'))}
                    <CustomSwitch checked={false} handleChange={() => {}} name={'Actions from another platform'} />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={24}>
                    {renderDropdown(t('TaskList.Filters.taskStatus'))}
                    {renderDropdown(t('TaskList.Filters.providerName'))}
                    {renderDropdown(t('TaskList.Filters.contractor'))}
                    {renderDropdown(t('TaskList.Filters.conclusion'))}
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={12}>
                    {renderDropdown(t('TaskList.Filters.documentType'))}
                    {renderDropdown(t('TaskList.Filters.taskNumber'))}
                    {renderDropdown(t('TaskList.Filters.taskType'))}
                    {renderCheckbox(t('TaskList.Filters.isUpdating'))}
                </Grid>
            </Grid>

            {isMoreFiltersActive && <AdditionalFilter />}

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

export default Filter;
