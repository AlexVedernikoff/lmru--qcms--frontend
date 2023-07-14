import {DatePicker, Dropdown, DropdownItem, Grid} from 'fronton-react';
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

    const renderDropdown = (text: string, name: string) => (
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
    );

    return (
        <Grid gap={16} columns="repeat(3, 1fr)" alignItems="baseline">
            {renderDropdown(t('TaskList.Filters.qualityStatus'), 'qualityStatus')}
            {renderDropdown(t('TaskList.Filters.regularStatus'), 'regularStatus')}
            {renderDropdown(t('TaskList.Filters.qualityModel'), 'qualityModel')}
            {renderDropdown(t('TaskList.Filters.characteristics'), 'characteristics')}
            {renderDropdown(t('TaskList.Filters.characteristicValue'), 'characteristicValue')}

            {renderDropdown(t('TaskList.Filters.gamma'), 'gamma')}

            <Grid gap={16} columns="1fr" alignItems="baseline">
                <CustomCheckbox
                    name="fromProject"
                    onChange={handleCheck}
                    value={undefined}
                    // value={formState.fromProject as boolean}
                    label={t('TaskList.Filters.fromProject')}
                />
                <CustomCheckbox
                    name="withProviderActiveLink"
                    onChange={handleCheck}
                    value={undefined}
                    // value={formState.withProviderActiveLink as boolean}
                    label={t('TaskList.Filters.withProviderActiveLink')}
                />
                <CustomCheckbox
                    name="withoutTransfer"
                    onChange={handleCheck}
                    value={undefined}
                    // value={formState.withoutTransfer as boolean}
                    label={t('TaskList.Filters.withoutTransfer')}
                />
                <CustomCheckbox
                    name="containsSubstanceLimit"
                    onChange={handleCheck}
                    value={undefined}
                    // value={formState.scontainsSubstanceLimit as boolean}
                    label={t('TaskList.Filters.containsSubstanceLimit')}
                />
            </Grid>

            <Grid gap={16} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.country'), 'country')}
                {renderDropdown(t('TaskList.Filters.containsSubstance'), 'containsSubstance')}
                <CustomSwitch
                    checked={false}
                    handleChange={() => {}}
                    name={t('TaskList.Filters.withoutQualityManager')}
                />
            </Grid>

            <Grid gap={16} columns="1fr" alignItems="baseline">
                {renderDropdown(t('TaskList.Filters.searchByDate'), 'searchByDate')}
                <DatePicker
                    onChange={() => {}}
                    label={t('TaskList.Filters.dates')}
                    size="s"
                    datePlaceholder={t('TaskList.Filters.dateMask')}
                />
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
