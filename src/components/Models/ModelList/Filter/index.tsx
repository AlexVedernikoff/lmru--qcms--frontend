import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import modelsApi from '../../modelsApi';
import {skipToken} from '@reduxjs/toolkit/dist/query';

export interface IFilterFormState {
    qualityModel?: string;
    modelNameOrCode?: string;
    QE?: string;
    productModel?: string;
    personLevelRiskForCorrectUsage?: string;
}

interface IProps {
    onSubmit: (filters: IFilterFormState) => void;
}

const ModelsFilter: React.FC<IProps> = ({onSubmit}) => {
    const {isLoading} = modelsApi.endpoints.getModels.useQueryState(skipToken);
    const [formState, setFormState] = useState<IFilterFormState>({});

    const {t} = useTranslation('models');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setFormState(p => ({...p, [e.target.name]: value}));
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = _e => {
        onSubmit({});
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = _e => {
        onSubmit(formState);
    };

    return (
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
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ModelList.Filters.QE')}
                        name={'QE'}
                        placeholder=""
                        value={formState.QE}
                        onChange={handleInputChange}
                    />
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
                    <AdditionalFilter formState={formState} setFormState={setFormState} />
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
                    <RegularButton disabled={isLoading} onClick={handleClear} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton disabled={isLoading} size="m" variant="primary" onClick={handleSubmit}>
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ModelsFilter;
