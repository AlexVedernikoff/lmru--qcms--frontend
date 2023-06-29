import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import ProductsAdditionalFilter, {EDateType} from './ProductsAdditionalFilter';
import styles from '../../../Common.module.css';
import {TreeSelect} from 'antd';
import withModelApi from '../withModelApi';

export interface IFilterFormState {
    code?: string; //  optional, поиск по ЛМ коду товара (логическое или }
    adeoCode?: string; // optional, поиск по коду ADEO
    description?: string; // optional, название товара
    ean?: string; // optionaд, ШК товара
    supplierName?: string; // optional
    supplierTaxIndetifier?: string; // optional
    qualityModelId?: string; // optional, номер модели качества связанной с товаром
    range?: string; // optional
    withQualityModel?: boolean; // optoional, поиск по наличию qualityModelId в теле сущности
    mdd?: boolean; // optional, поиск по товарам СТМ
    import?: boolean; //optional, поиск по импорту
    project?: boolean; // optional
    blockType?: string; // optional
    productWithSubstances?: string; // optional
    regulatoryStatuses?: string[]; // (логическое или) ??
    conformityStatuses?: string[]; // (логическое или) ??

    customId?: string;
    supplierRMSCode?: string;
    value?: string;
    attributeCode?: string;
    buCode?: string;
    productModelNomenclatureModelCode?: string;
    productModelNomenclatureConsolidationCode?: string;
    productModelNomenclatureSubDepartmentCode?: string;
    productModelNomenclatureDepartmentCode?: string;
    productModel?: string[];
    status?: string;
    regulatoryStatus?: string;
    isProductWithSubstance?: boolean;
    startDate?: string;
    endDate?: string;
    dateType?: EDateType;

    fromProject?: boolean;
    withoutTransfer?: boolean;
    dataForProduct?: boolean;
    waitingQualification?: boolean;
    waitingCertification?: boolean;
    activeProducts?: boolean;
}

interface IProps {
    onSubmit: (filters: IFilterFormState) => void;
}

const ProductsFilter: React.FC<IProps> = ({onSubmit}) => {
    const {t} = useTranslation('products');
    const {data: nomenclature = []} = withModelApi.useGetProductsNomenclatureQuery({
        header: {
            securityCode: 'security_code',
        },
    });
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);
    const [formState, setFormState] = useState<IFilterFormState>({});

    const [filterSupplier, setFilterSupplier] = useState<string>('supplierName');
    const [inputFilterSupplier, setInputFilterSupplier] = useState<string>();
    const [filterProduct, setFilterProduct] = useState<string>('code');
    const [inputFilterProduct, setInputFilterProduct] = useState<string>();

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
                            .map(v => v.code)
                            .join(''),
                    });
                    break;
                case 'subdepartment':
                    setFormState({
                        ...formState,
                        productModelNomenclatureSubDepartmentCode: nomenclature
                            .flatMap(v => v.subdepartments.filter(s => s.code === code))
                            .map(v => v.code)
                            .join(''),
                    });
                    break;
                case 'consolidation':
                    setFormState({
                        ...formState,
                        productModelNomenclatureConsolidationCode: nomenclature
                            .flatMap(v =>
                                v.subdepartments.flatMap(s => s.modelConsolidationGroups.filter(c => c.code === code))
                            )
                            .map(v => v.code)
                            .join(''),
                    });
                    break;
                case 'model':
                    setFormState({
                        ...formState,
                        productModelNomenclatureModelCode: nomenclature
                            .flatMap(v =>
                                v.subdepartments.flatMap(s =>
                                    s.modelConsolidationGroups?.flatMap(c => c?.models?.filter(m => m?.code === code))
                                )
                            )
                            .map(v => v?.code)
                            .join(''),
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
        setInputFilterSupplier(undefined);
        setInputFilterProduct(undefined);
        onSubmit(formState);
    };

    const handleSelect = (name: string) => (value: string | null) => {
        setFormState({...formState, [name]: value!});
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = _e => {
        onSubmit(formState);
    };

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithModels.Filters.filter')}
                        value={filterSupplier}
                        onSelect={function selectfilter(value) {
                            value && setFilterSupplier(value);
                        }}
                    >
                        <DropdownItem text={t('WithModels.Filters.providerName')} value={'supplierName'} />
                        <DropdownItem text={t('WithModels.Filters.supplierCode')} value={'supplierRMSCode'} />
                        <DropdownItem text={t('WithModels.Filters.INN')} value={'supplierTaxIndetifier'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={filterSupplier}
                        value={inputFilterSupplier}
                        onChange={(e, value) => {
                            setInputFilterSupplier(value);
                            handleInputChange(e, value);
                        }}
                    />
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithModels.Filters.filter')}
                        value={filterProduct}
                        onSelect={function selectFilter(value) {
                            value && setFilterProduct(value);
                        }}
                    >
                        <DropdownItem text={t('WithModels.Filters.productCode')} value={'code'} />
                        <DropdownItem text={t('WithModels.Filters.EAN')} value={'ean'} />
                        <DropdownItem text={t('WithModels.Filters.TNVD')} value={'customId'} />
                        <DropdownItem text={t('WithModels.Filters.productName')} value={'description'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={filterProduct}
                        value={inputFilterProduct}
                        onChange={(e, value) => {
                            setInputFilterProduct(value);
                            handleInputChange(e, value);
                        }}
                    />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    {/* TODO очищать селект и отображать nameRU */}
                    <TreeSelect
                        size="large"
                        treeData={treeData}
                        value={formState.productModel}
                        onChange={handleProductModelChange}
                        placeholder={t('WithModels.Filters.nomenclature')}
                        showCheckedStrategy="SHOW_PARENT"
                        treeCheckable
                    />
                    {/* TODO валидация чтоб ельзя было вводить ничего кроме чисел */}
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('WithModels.Filters.qualityModel')}
                        name={'qualityModelId'}
                        placeholder=""
                        value={formState.qualityModelId}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={'Статус качества'}
                        value={formState.status!}
                        onSelect={handleSelect('status')}
                    >
                        <DropdownItem text="Отсутствуют данные о качестве" value={'MISSING_DATA'} />
                        <DropdownItem text="Квалификация " value={'QUALIFICATION_IN_PROGRESS'} />
                        <DropdownItem text="Сбор документации" value={'DOCUMENT_COLLECTION'} />
                        <DropdownItem text="Сертифицирован" value={'CERTIFIED'} />
                        <DropdownItem text="Не сертифицирован " value={'NOT_CERTIFIED '} />
                        <DropdownItem text="Временно сертифицирован" value={'TEMPORARILY_ALLOWED'} />
                    </Dropdown>

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={'Статус поставщика'}
                        value={formState.regulatoryStatus!}
                        onSelect={handleSelect('regulatoryStatus')}
                    >
                        <DropdownItem text="Дистрибьютер" value={'MANUFACTURER'} />
                        <DropdownItem text="Импортер" value={'IMPORTER'} />
                        <DropdownItem text="Поставщик" value={'DISTRIBUTOR'} />
                    </Dropdown>
                </Grid>
            </Grid>

            {isMoreFiltersActive && (
                <Grid columnGap={16} columns="1fr" alignItems="center">
                    <ProductsAdditionalFilter
                        handleInputChange={handleInputChange}
                        formState={formState}
                        setFormState={setFormState}
                    />
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
