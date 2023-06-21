import {Checkbox, Dropdown, DropdownItem, Grid} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {IFilterFormState} from '.';

const riskLevels = Array.from({length: 5}, (_v, i) => {
    const val = i + 1;
    return <DropdownItem key={val} text={val.toString()} value={val} />;
});

interface IProps {
    formState: IFilterFormState;
    setFormState: (state: IFilterFormState) => void;
}

const AdditionalFilter: React.FC<IProps> = ({formState, setFormState}) => {
    const {t} = useTranslation('models');

    const handleSelect = (name: string) => (value: string | null) => {
        setFormState({...formState, [name]: value!});
    };

    const handleCheckbox = (name: string) => (next: boolean) => {
        setFormState({...formState, [name]: next});
    };

    return (
        <Grid columnGap={24} columns="repeat(3, 1fr)" alignItems="baseline">
            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.withoutPlan')}
                    value={formState.withoutPlan}
                    onSelect={handleSelect('withoutPlan')}
                >
                    <DropdownItem text={t('Common.Yes')} value={'YES'} />
                    <DropdownItem text={t('Common.No')} value={'NO'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.latestChanges')}
                    value={formState.latestChanges}
                    onSelect={handleSelect('latestChanges')}
                >
                    {riskLevels}
                </Dropdown>

                <Grid rowGap={18} columns="1fr">
                    <Checkbox
                        onChange={handleCheckbox('isVerificationRequired')}
                        checked={formState.isVerificationRequired!}
                        label={t('ModelList.Filters.isVerificationRequired')}
                    />
                    <Checkbox
                        onChange={handleCheckbox('hasManyProducts')}
                        checked={formState.hasManyProducts!}
                        label={t('ModelList.Filters.hasManyProducts')}
                    />
                    <Checkbox
                        onChange={handleCheckbox('forMixtures')}
                        checked={formState.forMixtures!}
                        label={t('ModelList.Filters.isChemical')}
                    />
                </Grid>
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskByProductUsageNegative')}
                    value={formState.personLevelRiskForNonCorrectUsage!}
                    onSelect={handleSelect('personLevelRiskForNonCorrectUsage')}
                >
                    {riskLevels}
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskEnvironment')}
                    value={formState.sustainabilityRisk!}
                    onSelect={handleSelect('sustainabilityRisk')}
                >
                    {riskLevels}
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskByProductUsagePositive')}
                    value={formState.personLevelRiskForCorrectUsage!}
                    onSelect={handleSelect('personLevelRiskForCorrectUsage')}
                >
                    {riskLevels}
                </Dropdown>
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.risk')}
                    value={formState.calculatedRisk!}
                    onSelect={handleSelect('calculatedRisk')}
                >
                    <DropdownItem text="низкий" value={'MINOR'} />
                    <DropdownItem text="средний" value={'MAJOR'} />
                    <DropdownItem text="высокий" value={'CRITICAL'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskProperty')}
                    value={formState.productRiskLevel!}
                    onSelect={handleSelect('productRiskLevel')}
                >
                    {riskLevels}
                </Dropdown>

                <Grid rowGap={24} columnGap={24} columns="1fr 1fr" alignItems="baseline">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ModelList.Filters.riskLegal')}
                        value={formState.regulatoryRisk!}
                        onSelect={handleSelect('regulatoryRisk')}
                    >
                        {riskLevels}
                    </Dropdown>

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ModelList.Filters.riskHealth')}
                        value={formState.healthRisk!}
                        onSelect={handleSelect('healthRisk')}
                    >
                        {riskLevels}
                    </Dropdown>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
