import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import modelsApi from '../../modelsApi';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import {TreeSelect} from 'antd';

export interface IFilterFormState {
    qualityModel?: string;
    modelNameOrCode?: string;
    QE?: string;
    productModel?: string[];
    personLevelRiskForCorrectUsage?: string;
    personLevelRiskForNonCorrectUsage?: string;
    productRiskLevel?: string;
    sustainabilityRisk?: string;
    regulatoryRisk?: string;
    calculatedRisk?: string;
    healthRisk?: string;
    linkedToNomenclature?: boolean;
    linkedToEngineer?: boolean;
    forMixtures?: boolean;
    isVerificationRequired?: boolean;
    hasManyProducts?: boolean;
    withoutPlan?: string;
    latestChanges?: string;
    productModelNomenclatureDepartmentCode?: string[];
    productModelNomenclatureSubDepartmentCode?: string[];
    productModelNomenclatureConsolidationCode?: string[];
    productModelNomenclatureModelCode?: string[];
}

interface IProps {
    onSubmit: (filters: IFilterFormState) => void;
}

const ModelsFilter: React.FC<IProps> = ({onSubmit}) => {
    const {data: nomenclature = []} = modelsApi.useGetModelNomenclatureQuery({securityCode: 'security_code'});
    const {isLoading} = modelsApi.endpoints.getModels.useQueryState(skipToken);
    const [formState, setFormState] = useState<IFilterFormState>({});

    const {t} = useTranslation('models');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const treeData = useMemo(
        () =>
            nomenclature.map(el => ({
                title: el.code,
                value: `department ${el.code}`,
                children: el.subdepartments.map(subDep => ({
                    title: subDep.code,
                    value: `subdepartment ${subDep.code}`,
                    children: subDep.modelConsolidationGroups.map(modCon => ({
                        title: modCon.code,
                        value: `consolidation ${modCon.code}`,
                        children: modCon?.models?.map(mod => ({
                            title: mod.code,
                            value: `model ${mod.code}`,
                        })),
                    })),
                })),
            })),
        [nomenclature]
    );

    const handleProductModelChange = (value: string[]) => {
        setFormState({...formState, productModel: value.length > 0 ? value : undefined});

        for (const selected of value) {
            const [type, code] = selected.split(' ');
            switch (type) {
                case 'department':
                    setFormState({
                        ...formState,
                        productModelNomenclatureDepartmentCode: nomenclature
                            .filter(v => v.code === code)
                            .map(v => v.code),
                    });
                    break;
                case 'subdepartment':
                    setFormState({
                        ...formState,
                        productModelNomenclatureSubDepartmentCode: nomenclature
                            .flatMap(v => v.subdepartments.filter(s => s.code === code))
                            .map(v => v.code),
                    });
                    break;
                case 'consolidation':
                    setFormState({
                        ...formState,
                        productModelNomenclatureConsolidationCode: nomenclature
                            .flatMap(v =>
                                v.subdepartments.flatMap(s => s.modelConsolidationGroups.filter(c => c.code === code))
                            )
                            .map(v => v.code),
                    });
                    break;
                case 'model':
                    setFormState({
                        ...formState,
                        productModelNomenclatureModelCode: nomenclature
                            .flatMap(v =>
                                v.subdepartments.flatMap(s =>
                                    s.modelConsolidationGroups.flatMap(c => c.models.filter(m => m.code === code))
                                )
                            )
                            .map(v => v.code),
                    });
                    break;
            }
        }
    };

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setFormState(p => ({...p, [e.target.name]: value}));
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = _e => {
        setFormState({});
        onSubmit(formState);
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = _e => {
        onSubmit(formState);
    };

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap={48}>
                <Grid columnGap={16} columns="1fr" alignItems="center" rowGap={25}>
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

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={25}>
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

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={14}>
                    <TreeSelect
                        size="large"
                        treeData={treeData}
                        value={formState.productModel}
                        onChange={handleProductModelChange}
                        placeholder={t('ModelList.Filters.productModel')}
                        showCheckedStrategy="SHOW_PARENT"
                        treeCheckable
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
