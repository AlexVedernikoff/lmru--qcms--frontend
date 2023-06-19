import {Checkbox, Dropdown, DropdownItem, Grid} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {IFilterFormState} from '.';

interface IProps {
    formState: IFilterFormState;
    setFormState: (state: IFilterFormState) => void;
}

const AdditionalFilter: React.FC<IProps> = ({formState, setFormState}) => {
    const {t} = useTranslation('models');

    const handleSelect = (name: string) => (value: string | null) => {
        setFormState({...formState, [name]: value!});
    };

    return (
        <Grid columnGap={24} columns="repeat(3, 1fr)" alignItems="baseline">
            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.withoutPlan')}
                    value={undefined}
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
                    value={undefined}
                    onSelect={handleSelect('latestChanges')}
                >
                    <DropdownItem text="1" value={'1'} />
                    <DropdownItem text="2" value={'2'} />
                    <DropdownItem text="3" value={'3'} />
                    <DropdownItem text="4" value={'4'} />
                    <DropdownItem text="5" value={'5'} />
                </Dropdown>

                <Grid rowGap={18} columns="1fr">
                    <Checkbox checked={false} label={t('ModelList.Filters.isVerificationRequired')} />
                    <Checkbox checked={false} label={t('ModelList.Filters.hasManyProducts')} />
                    <Checkbox checked={false} label={t('ModelList.Filters.isChemical')} />
                </Grid>
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskByProductUsageNegative')}
                    value={undefined}
                    onSelect={handleSelect('riskByProductUsageNegative')}
                >
                    <DropdownItem text="1" value={'1'} />
                    <DropdownItem text="2" value={'2'} />
                    <DropdownItem text="3" value={'3'} />
                    <DropdownItem text="4" value={'4'} />
                    <DropdownItem text="5" value={'5'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskEnvironment')}
                    value={undefined}
                    onSelect={handleSelect('riskEnvironment')}
                >
                    <DropdownItem text="1" value={'1'} />
                    <DropdownItem text="2" value={'2'} />
                    <DropdownItem text="3" value={'3'} />
                    <DropdownItem text="4" value={'4'} />
                    <DropdownItem text="5" value={'5'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.riskByProductUsagePositive')}
                    value={undefined}
                    onSelect={handleSelect('riskByProductUsagePositive')}
                >
                    <DropdownItem text="1" value={'1'} />
                    <DropdownItem text="2" value={'2'} />
                    <DropdownItem text="3" value={'3'} />
                    <DropdownItem text="4" value={'4'} />
                    <DropdownItem text="5" value={'5'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelList.Filters.risk')}
                    value={undefined}
                    onSelect={handleSelect('risk')}
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
                    value={undefined}
                    onSelect={handleSelect('riskProperty')}
                >
                    <DropdownItem text="1" value={'1'} />
                    <DropdownItem text="2" value={'2'} />
                    <DropdownItem text="3" value={'3'} />
                    <DropdownItem text="4" value={'4'} />
                    <DropdownItem text="5" value={'5'} />
                </Dropdown>

                <Grid rowGap={24} columnGap={24} columns="1fr 1fr" alignItems="baseline">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ModelList.Filters.riskLegal')}
                        value={undefined}
                        onSelect={handleSelect('riskLegal')}
                    >
                        <DropdownItem text="1" value={'1'} />
                        <DropdownItem text="2" value={'2'} />
                        <DropdownItem text="3" value={'3'} />
                        <DropdownItem text="4" value={'4'} />
                        <DropdownItem text="5" value={'5'} />
                    </Dropdown>

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('ModelList.Filters.riskHealth')}
                        value={undefined}
                        onSelect={handleSelect('riskHealth')}
                    >
                        <DropdownItem text="1" value={'1'} />
                        <DropdownItem text="2" value={'2'} />
                        <DropdownItem text="3" value={'3'} />
                        <DropdownItem text="4" value={'4'} />
                        <DropdownItem text="5" value={'5'} />
                    </Dropdown>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
