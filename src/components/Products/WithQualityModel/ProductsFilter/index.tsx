import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import ProductsAdditionalFilter, {EDateType} from './ProductsAdditionalFilter';
import styles from '../../../Common.module.css';
import {СustomTreeSelect, TNomenclatureValue} from '../../../Common/CustomTreeSelect';
import {modNomKeys} from '../../../Common/CustomTreeSelect/consts';
import {useAppSelector} from 'store';
import {EUserRole} from 'common/roles';

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
    productModelNomenclatureDepartmentId?: string[];
    productModelNomenclatureSubdepartmentId?: string[];
    productModelNomenclatureConsolidationId?: string[];
    productModelNomenclatureCodeId?: string[];
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
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);
    const [formState, setFormState] = useState<IFilterFormState>({});

    const [filterSupplier, setFilterSupplier] = useState<string>('supplierName');
    const [inputFilterSupplier, setInputFilterSupplier] = useState<string>();
    const [filterProduct, setFilterProduct] = useState<string>('code');
    const [inputFilterProduct, setInputFilterProduct] = useState<string>();

    const treeSelectValue = (keys: string[]) => {
        const result: TNomenclatureValue = {};
        for (let key of keys) {
            result[key as string] = (formState[key as keyof IFilterFormState] as string[]) || [];
        }
        return result;
    };

    const modelNomenclatureValue = treeSelectValue(modNomKeys);

    const onTreeChange = (result: TNomenclatureValue) => {
        setFormState({...formState, ...result});
    };

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string | number) => {
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

    const userData = useAppSelector(store => store.userStore.userData!);

    const hasUserEditFiltersPermission =
        userData.roles.includes(EUserRole.Admin) ||
        userData.roles.includes(EUserRole.KeyUser) ||
        userData.roles.includes(EUserRole.QE) ||
        userData.roles.includes(EUserRole.InternalUser);

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Grid rowGap="7px">
                        <Dropdown
                            size="m"
                            closeOnSelect
                            placeholder={t('Common.Select')}
                            label={t('WithModels.Filters.filter')}
                            value={hasUserEditFiltersPermission ? filterSupplier : 'supplierRMSCode'}
                            onSelect={function selectfilter(value) {
                                value && setFilterSupplier(value);
                            }}
                            disabled={!hasUserEditFiltersPermission}
                        >
                            <DropdownItem text={t('WithModels.Filters.providerName')} value={'supplierName'} />
                            <DropdownItem text={t('WithModels.Filters.supplierCode')} value={'supplierRMSCode'} />
                            <DropdownItem text={t('WithModels.Filters.INN')} value={'supplierTaxIndetifier'} />
                        </Dropdown>

                        <Input
                            disabled={!hasUserEditFiltersPermission}
                            inputSize="m"
                            autoComplete="off"
                            name={filterSupplier}
                            value={hasUserEditFiltersPermission ? inputFilterSupplier : userData.supplierCommercialIds}
                            onChange={(e, value) => {
                                setInputFilterSupplier(value);
                                handleInputChange(e, value);
                            }}
                        />
                    </Grid>
                    <Grid rowGap="7px">
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
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    {/**************** Фильтр "Номенклатура товарной модели" **************** */}
                    <СustomTreeSelect nomenclatureValue={modelNomenclatureValue} handleChange={onTreeChange} />
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

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="12px">
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
                        <DropdownItem text="Дистрибьютор" value={'MANUFACTURER'} />
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
