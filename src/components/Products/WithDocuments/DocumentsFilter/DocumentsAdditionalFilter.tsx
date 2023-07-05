import {useDispatch, useSelector} from 'react-redux';
import {Dropdown, DropdownItem, Grid, Input} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {setProductsDocumentsFilters} from '../../../../store/slices/productsDocumentsSlice';
import {TRootState} from '../../../../store/index';
import {IFilters} from '../../../../store/slices/productsDocumentsSlice';
import {СustomTreeSelect, TNomenclatureValue} from '../../../Common/CustomTreeSelect';
import {modNomKeys, manNomKeys} from '../../../Common/CustomTreeSelect/consts';

const ProductsAdditionalFilter: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation('products');

    const productsDocumentsFiltersState = useSelector((state: TRootState) => state.productsDocumentsFilters);

    const onHandleFilterChange = (e: IFilters[keyof IFilters] | null, k: string) => {
        dispatch(setProductsDocumentsFilters([e, k]));
    };

    const treeSelectValue = (keys: string[]) => {
        const result: TNomenclatureValue = {};
        for (let key of keys) {
            result[key as string] = (productsDocumentsFiltersState[key as keyof IFilters] as string[]) || [];
        }
        return result;
    };

    const modelNomenclatureValue = treeSelectValue(modNomKeys);
    const managementNomenclatureValue = treeSelectValue(manNomKeys);

    const onTreeChange = (result: TNomenclatureValue) => {
        for (const key in result) {
            onHandleFilterChange(result[key] as string[] | number[], key);
        }
    };

    const {country, qualityModelId} = productsDocumentsFiltersState;

    return (
        <Grid columnGap={16} columns="repeat(2, 1fr)" alignItems="baseline">
            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                {/**************** Фильтр "10 Страна" *****************/}
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder="Выберите"
                    label={t('WithDocuments.DetailFilters.Country')}
                    value={country}
                    onSelect={e => onHandleFilterChange(e, 'country')}
                >
                    <DropdownItem text={t('WithDocuments.Table.Russia')} value={9} />
                </Dropdown>

                {/**************** Фильтр "11 Модель качества" *****************/}
                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('WithDocuments.DetailFilters.QualityModel')}
                    name={'qualityModelId'}
                    placeholder=""
                    value={qualityModelId ? String(qualityModelId[0]) : undefined}
                    onChange={e => {
                        const eventToNum = Number(e.target.value);
                        if (isNaN(eventToNum)) return;
                        onHandleFilterChange([eventToNum], 'qualityModelId');
                    }}
                />
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                {/**************** Фильтр "11 Номенклатура товарной модели" **************** */}
                <СustomTreeSelect nomenclatureValue={modelNomenclatureValue} handleChange={onTreeChange} />
                {/**************** Фильтр "12 Управленческая номенклатура" *****************/}
                <СustomTreeSelect nomenclatureValue={managementNomenclatureValue} handleChange={onTreeChange} />
            </Grid>
        </Grid>
    );
};

export default ProductsAdditionalFilter;
