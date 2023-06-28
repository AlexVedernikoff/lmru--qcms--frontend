import {DatePickerRange, Dropdown, DropdownItem, Grid} from 'fronton-react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import CustomCheckbox from '../../../Common/CustomCheckbox/CustomCheckbox';
import {TFilterFormState} from '.';

interface IProps {
    formState: TFilterFormState;
    setFormState: (state: TFilterFormState) => void;
}

const AdditionalFilter: React.FC<IProps> = ({formState, setFormState}) => {
    const {t} = useTranslation('tasks');

    const handleSelect = (name: keyof TFilterFormState) => (value: string | null) => {
        setFormState({...formState, [name]: formState[name] === value ? undefined : value!});
    };

    const handleCheck = (value: boolean | undefined, name: string) => {
        setFormState({...formState, [name]: value});
    };

    const renderDropdown = useCallback(
        (text: string, name: string) => (
            <Dropdown
                size="m"
                closeOnSelect
                placeholder={t('Common.Select')}
                label={text}
                value={undefined}
                onSelect={handleSelect(name as keyof TFilterFormState)}
            >
                <DropdownItem text="test" value={'test'} />
            </Dropdown>
        ),
        // @ts-ignore-next-line
        [t]
    );

    return (
        <Grid columnGap={24} columns="repeat(3, 1fr)" alignItems="baseline">
            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.qualityStatus'), 'qualityStatus')}
                {renderDropdown(t('TaskList.Filters.regularStatus'), 'regularStatus')}
                {renderDropdown(t('TaskList.Filters.qualityModel'), 'qualityModel')}
                {renderDropdown(t('TaskList.Filters.characteristics'), 'characteristics')}
                {renderDropdown(t('TaskList.Filters.characteristicValue'), 'characteristicValue')}
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.gamma'), 'gamma')}
                <Grid columnGap={16} rowGap={24} columns="120px 1fr" alignItems="center" alignContent="center">
                    <CustomCheckbox
                        name="fromProject"
                        onChange={handleCheck}
                        // @ts-ignore-next-line
                        value={formState.fromProject as boolean}
                        label={t('TaskList.Filters.fromProject')}
                    />
                    <CustomCheckbox
                        name="withProviderActiveLink"
                        onChange={handleCheck}
                        // @ts-ignore-next-line
                        value={formState.withProviderActiveLink as boolean}
                        label={t('TaskList.Filters.withProviderActiveLink')}
                    />
                    <CustomCheckbox
                        name="withoutTransfer"
                        onChange={handleCheck}
                        // @ts-ignore-next-line
                        value={formState.withoutTransfer as boolean}
                        label={t('TaskList.Filters.withoutTransfer')}
                    />
                    <CustomCheckbox
                        name="containsSubstanceLimit"
                        onChange={handleCheck}
                        // @ts-ignore-next-line
                        value={formState.containsSubstanceLimit as boolean}
                        label={t('TaskList.Filters.containsSubstanceLimit')}
                    />
                </Grid>
                {renderDropdown(t('TaskList.Filters.containsSubstance'), 'containsSubstance')}

                <CustomSwitch
                    checked={false}
                    handleChange={() => {}}
                    name={t('TaskList.Filters.withoutQualityManager')}
                />
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.searchByDate'), 'searchByDate')}
                <DatePickerRange onChange={() => {}} label={t('TaskList.Filters.dates')} size="s" />
                {renderDropdown(t('TaskList.Filters.country'), 'country')}
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
