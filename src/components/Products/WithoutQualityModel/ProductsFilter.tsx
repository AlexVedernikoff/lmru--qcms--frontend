import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, Input, RegularButton, Typography} from 'fronton-react';
import styles from '../../Common.module.css';
import withoutModelApi from './withoutModelApi';
import {TreeSelect} from 'antd';
import {ChangeEvent, useMemo, useState} from 'react';

export enum FilterType {
    SupplierName = 'SupplierName',
    SupplierTaxIdentifier = 'SupplierTaxIdentifier',
    SupplierCode = 'SupplierCode',
}

export interface IFilterFormState {
    productModelNomenclatureModelCode?: string;
    productModelNomenclatureConsolidationCode?: string;
    productModelNomenclatureSubDepartmentCode?: string;
    productModelNomenclatureDepartmentCode?: string;
    productModel?: string[];

    regulatoryStatus?: string;

    project?: boolean;

    filterType?: FilterType;
    filterString?: string;
}

interface IProps {
    onSubmit: (filters: IFilterFormState) => void;
}

const ProductsFilter: React.FC<IProps> = ({onSubmit}) => {
    const {t} = useTranslation('products');

    const [formState, setFormState] = useState<IFilterFormState>({});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
        const name = event.target.name as keyof IFilterFormState;
        setFormState({...formState, [name]: value!});
    };

    const handleSubmit = () => onSubmit(formState);

    const handleSelect = (name: keyof IFilterFormState) => (value: string | null) => {
        setFormState(prevFormState => ({
            ...prevFormState,
            [name]: prevFormState[name] === value || !value ? undefined : value,
        }));
    };

    const handleClear = () => {
        setFormState({});
        onSubmit(formState);
    };

    const {data: nomenclature = []} = withoutModelApi.useGetModelNomenclatureQuery({
        header: {securityCode: 'security_code'},
    });

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
                            title: mod.nameRu || mod.code,
                            value: `model ${mod.code}`,
                        })),
                    })),
                })),
            })),
        [nomenclature]
    );

    const handleProductModelChange = (value: string[]) => {
        let formNewState: IFilterFormState = {...formState, productModel: value.length > 0 ? value : undefined};

        for (const selected of value) {
            const [type, code] = selected.split(' ');
            switch (type) {
                case 'department':
                    formNewState.productModelNomenclatureDepartmentCode = nomenclature
                        .filter(v => v.code === code)
                        .map(v => v.code)
                        .join('');
                    break;
                case 'subdepartment':
                    formNewState.productModelNomenclatureSubDepartmentCode = nomenclature
                        .flatMap(v => v.subdepartments.filter(s => s.code === code))
                        .map(v => v.code)
                        .join('');
                    break;
                case 'consolidation':
                    formNewState.productModelNomenclatureConsolidationCode = nomenclature
                        .flatMap(v =>
                            v.subdepartments.flatMap(s => s.modelConsolidationGroups.filter(c => c.code === code))
                        )
                        .map(v => v.code)
                        .join('');
                    break;
                case 'model':
                    formNewState.productModelNomenclatureModelCode = nomenclature
                        .flatMap(v =>
                            v.subdepartments.flatMap(s =>
                                s.modelConsolidationGroups?.flatMap(c => c?.models?.filter(m => m?.code === code))
                            )
                        )
                        .map(v => v?.code)
                        .join('');
                    break;
            }
        }
        setFormState(formNewState);
    };

    const handleInProjectYesCheckBoxClick = () => {
        setFormState(prevFormState => ({...prevFormState, project: prevFormState.project === true ? undefined : true}));
    };

    const handleInProjectNoCheckBoxClick = () => {
        setFormState(prevFormState => ({
            ...prevFormState,
            project: prevFormState.project === false ? undefined : false,
        }));
    };

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="12px">
                    <TreeSelect
                        size="large"
                        treeData={treeData}
                        value={formState.productModel}
                        onChange={handleProductModelChange}
                        placeholder={t('WithModels.Filters.nomenclature')}
                        showCheckedStrategy="SHOW_PARENT"
                        treeCheckable
                    />

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={'Регуляторный статус'}
                        value={formState.regulatoryStatus!}
                        onSelect={handleSelect('regulatoryStatus')}
                    >
                        <DropdownItem text="Дистрибьютор" value={'MANUFACTURER'} />
                        <DropdownItem text="Импортер" value={'IMPORTER'} />
                        <DropdownItem text="Поставщик" value={'DISTRIBUTOR'} />
                    </Dropdown>
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="32px">
                    <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                        <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                            <Checkbox
                                onChange={handleInProjectYesCheckBoxClick}
                                checked={formState.project === true}
                                label={t('Common.Yes')}
                            />
                            <Checkbox
                                onChange={handleInProjectNoCheckBoxClick}
                                checked={formState.project === false}
                                label={t('Common.No')}
                            />
                        </Grid>
                        <Typography variant="s" size="body_short">
                            {t('WithoutModels.Filters.fromProject')}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid columnGap={16} columns="2fr" alignItems="baseline" rowGap="20px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder="Выберите"
                        label={t('WithoutModels.Filters.filter')}
                        value={formState.filterType}
                        onSelect={handleSelect('filterType')}
                    >
                        <DropdownItem text="Имя поставщика" value={FilterType.SupplierName} />
                        <DropdownItem text="ИНН поставщика" value={FilterType.SupplierTaxIdentifier} />
                        <DropdownItem text="Код поставщика" value={FilterType.SupplierCode} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filterString'}
                        value={formState.filterString}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>

            <Grid columnGap={16} columns="repeat(6, 1fr)" alignItems="baseline">
                <span />
                <span />
                <span />
                <span />
                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={handleClear} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton onClick={handleSubmit} size="m" variant="primary">
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsFilter;
