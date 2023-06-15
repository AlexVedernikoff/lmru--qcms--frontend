import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';

export interface IFilterFormState {
    qualityModel?: string;
    modelNameOrCode?: string;
    QE?: string;
    productModel?: string;
}

interface IProps {
    onSubmit: (filters: IFilterFormState) => void;
}

const ModelsFilter: React.FC<IProps> = ({onSubmit}) => {
    const [formState, setFormState] = useState<IFilterFormState>({});

    const {t} = useTranslation('models');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setFormState(p => ({...p, [e.currentTarget.name]: value}));
    };

    const handleSelect = (name: string) => (value: string | null) => {
        setFormState(p => ({...p, [name]: value!}));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = _e => {
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid rowGap={16} alignItems="center" className={styles.panel}>
                <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                    <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            label={t('ModelList.Filters.qualityModel')}
                            name={'qualityModel'}
                            placeholder=""
                            value={formState.qualityModel}
                            onChange={handleInputChange}
                        />

                        <Input
                            inputSize="m"
                            autoComplete="off"
                            label={t('ModelList.Filters.modelNameOrCode')}
                            name={'modelNameOrCode'}
                            placeholder=""
                            value={formState.modelNameOrCode}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                        <Dropdown
                            size="m"
                            closeOnSelect
                            placeholder={t('Common.Select')}
                            label={t('ModelList.Filters.QE')}
                            value={formState.QE}
                            onSelect={handleSelect('QE')}
                        >
                            <DropdownItem text="test" value={'test'} />
                            <DropdownItem text="test" value={'test'} />
                            <DropdownItem text="test" value={'test'} />
                        </Dropdown>
                    </Grid>

                    <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            label={t('ModelList.Filters.productModel')}
                            name={'productModel'}
                            placeholder=""
                            value={formState.productModel}
                            onChange={handleInputChange}
                        />
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

                        <RegularButton size="m" variant="primary" type="submit">
                            {t('Buttons.Search')}
                        </RegularButton>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default ModelsFilter;
