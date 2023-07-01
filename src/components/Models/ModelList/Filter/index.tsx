import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import modelsApi from '../../modelsApi';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import {TreeSelect} from 'antd';

import s from './AdditionalFilter.module.css';

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
    needApprove?: boolean;
    hasManyProducts?: boolean;
    withoutPlan?: string;
    productModelNomenclatureDepartmentCode?: string[];
    productModelNomenclatureSubDepartmentCode?: string[];
    productModelNomenclatureConsolidationCode?: string[];
    productModelNomenclatureModelCode?: string[];
    latestChanges?: string;
}

interface IProps {
    onSubmit: (filters: IFilterFormState) => void;
}

const ModelsFilter: React.FC<IProps> = ({onSubmit}) => {
    const {data: nomenclature = []} = modelsApi.useGetModelNomenclatureQuery({securityCode: 'security_code'});
    const {isLoading, isFetching} = modelsApi.endpoints.getModels.useQueryState(skipToken);
    const [formState, setFormState] = useState<IFilterFormState>({});

    const {t} = useTranslation('models');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const treeData = useMemo(
        () =>
            nomenclature.map(el => ({
                title: el.nameRu || el.code,
                value: `department ${el.code}`,
                children: el.subdepartments.map(subDep => ({
                    title: subDep.nameRu || subDep.code,
                    value: `subdepartment ${subDep.code}`,
                    children: subDep.modelConsolidationGroups.map(modCon => ({
                        title: modCon.nameRu || modCon.code,
                        value: `consolidation ${modCon.code}`,
                        children: modCon?.models?.map(mod => ({
                            title: modCon.nameRu || modCon.code,
                            value: `model ${mod.code}`,
                        })),
                    })),
                })),
            })),
        [nomenclature]
    );

    const handleProductModelChange = (value: string[]) => {
        let formNewState: IFilterFormState = {...formState, productModel: value.length > 0 ? [...value] : undefined};

        for (const selected of value) {
            const [type, code] = selected.split(' ');
            switch (type) {
                case 'department':
                    formNewState = {
                        ...formNewState,
                        productModelNomenclatureDepartmentCode: nomenclature
                            .filter(v => v.code === code)
                            .map(v => v.code),
                    };
                    break;
                case 'subdepartment':
                    formNewState = {
                        ...formNewState,
                        productModelNomenclatureSubDepartmentCode: nomenclature
                            .flatMap(v => v.subdepartments.filter(s => s.code === code))
                            .map(v => v.code),
                    };
                    break;
                case 'consolidation':
                    formNewState = {
                        ...formNewState,
                        productModelNomenclatureConsolidationCode: nomenclature
                            .flatMap(v =>
                                v.subdepartments.flatMap(s => s.modelConsolidationGroups.filter(c => c.code === code))
                            )
                            .map(v => v.code),
                    };
                    break;
                case 'model':
                    formNewState = {
                        ...formNewState,
                        productModelNomenclatureModelCode: nomenclature
                            .flatMap(v =>
                                v.subdepartments.flatMap(s =>
                                    s.modelConsolidationGroups.flatMap(c => c.models.filter(m => m.code === code))
                                )
                            )
                            .map(v => v.code),
                    };
                    break;
            }
        }

        setFormState(formNewState);
    };

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setFormState(p => ({...p, [e.target.name]: value}));
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = _e => {
        setFormState({});
        onSubmit({});
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = _e => {
        onSubmit(formState);
    };

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid gap={16} columns="repeat(3, 1fr)" alignItems="start">
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
                    label={t('ModelList.Filters.QE')}
                    name={'QE'}
                    placeholder=""
                    value={formState.QE}
                    onChange={handleInputChange}
                />

                <TreeSelect
                    className={s.treeSelect}
                    size="large"
                    treeData={treeData}
                    value={formState.productModel}
                    onChange={handleProductModelChange}
                    placeholder={t('ModelList.Filters.productModel')}
                    showCheckedStrategy="SHOW_PARENT"
                    treeCheckable
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
                    <RegularButton disabled={isLoading || isFetching} onClick={handleClear} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton disabled={isLoading || isFetching} size="m" variant="primary" onClick={handleSubmit}>
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ModelsFilter;
