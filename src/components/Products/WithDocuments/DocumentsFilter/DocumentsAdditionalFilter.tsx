import {useDispatch, useSelector} from 'react-redux';
import {Dropdown, DropdownItem, Grid, Input} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {TreeSelect} from 'antd';
import {setProductsDocumentsFilters} from '../../../../store/slices/productsDocumentsSlice';
import {useGetProductModelNomenclatureQuery} from '../../../../api/getProductModelNomenclature';
import {IProductModelNomenclatureResponse} from '../../../../common/types/productModelNomenclature';
import {TRootState} from '../../../../store/index';
import {IFilters} from '../../../../store/slices/productsDocumentsSlice';
import {useGetManagementNomenclatureQuery} from '../../../../api/getManagementNomenclature';
import {IManagementNomenclatureResponse} from '../../../../common/types/productManagementNomenclature';

const {SHOW_PARENT} = TreeSelect;

const ProductsAdditionalFilter: React.FC = () => {
    const dispatch = useDispatch();
    const {data: productModelNomenclature = []} = useGetProductModelNomenclatureQuery();

    const {data: managementNomenclature = []} = useGetManagementNomenclatureQuery();

    const productsDocumentsFiltersState = useSelector((state: TRootState) => state.productsDocumentsFilters);

    const onHandleFilterChange = (e: IFilters[keyof IFilters] | null, k: string) => {
        dispatch(setProductsDocumentsFilters([e, k]));
    };

    const modNomKeys = [
        'productModelNomenclatureDepartmentId',
        'productModelNomenclatureSubdepartmentId',
        'productModelNomenclatureConsolidationId',
        'productModelNomenclatureCodeId',
    ];

    const manNomLeys = [
        'productManagementNomenclatureDepartmentId',
        'productManagementNomenclatureSubdepartmentId',
        'productManagementNomenclatureTypeId',
        'productManagementNomenclatureSubtypeId',
    ];

    const productNomenclatureData = productModelNomenclature.map((el: IProductModelNomenclatureResponse) => {
        return {
            title: el.nameRu,
            value: `${modNomKeys[0]} ${el.code}`,
            children: el.subdepartments.map(subDep => {
                return {
                    title: subDep.nameRu,
                    value: `${modNomKeys[1]} ${subDep.code}`,
                    children: subDep.modelConsolidationGroups.map(modCon => {
                        return {
                            title: modCon.nameRu,
                            value: `${modNomKeys[2]} ${modCon.code}`,
                            children: modCon.models
                                ? modCon.models.map(mod => {
                                      return {
                                          title: mod.nameRu,
                                          value: `${modNomKeys[3]} ${mod.code}`,
                                      };
                                  })
                                : undefined,
                        };
                    }),
                };
            }),
        };
    });

    const managementNomenclatureData = managementNomenclature.map((el: IManagementNomenclatureResponse) => {
        return {
            title: el.name,
            value: `${manNomLeys[0]} ${el.id}`,
            children: el.subDepartments.map(subDep => {
                return {
                    title: subDep.name,
                    value: `${manNomLeys[1]} ${subDep.id}`,
                    children: subDep.types
                        ? subDep.types.map(modCon => {
                              return {
                                  title: modCon.name,
                                  value: `${manNomLeys[2]} ${modCon.id}`,
                                  children: modCon.subTypes
                                      ? modCon.subTypes.map(mod => {
                                            return {
                                                title: mod.name,
                                                value: `${manNomLeys[3]} ${mod.id}`,
                                            };
                                        })
                                      : undefined,
                              };
                          })
                        : undefined,
                };
            }),
        };
    });

    const {t} = useTranslation('products');

    const treeSelectValue = (keys: string[]) =>
        keys.reduce((acc: string[], key) => {
            const idsArr: string[] = productsDocumentsFiltersState[key as keyof IFilters] as string[];
            if (idsArr) acc.push(...idsArr.map((el: any) => `${key} ${el}`));
            return acc;
        }, []);

    const modelNomenclatureValue = treeSelectValue(modNomKeys);
    const managementNomenclatureValue = treeSelectValue(manNomLeys);

    const onTreeChange = (newValue: any, keys: any) => {
        const initialAcc = keys.reduce((acc: any, key: any) => {
            acc[key] = [];
            return acc;
        }, {});

        const result = newValue.reduce((acc: any, el: any) => {
            let [key, value] = el.split(' ');
            if (keys === manNomLeys) value = Number(value);
            acc[key].push(value);
            return acc;
        }, initialAcc);

        for (const key in result) {
            onHandleFilterChange(result[key], key);
        }
        if (!Object.keys(result).length) {
            keys.forEach((key: any) => {
                onHandleFilterChange([], key);
            });
        }
    };

    const tPropsProdNom = {
        treeData: productNomenclatureData,
        value: modelNomenclatureValue,
        onChange: (val: any) => onTreeChange(val, modNomKeys),
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: t('WithDocuments.DetailFilters.ProductModelNomenclature'),
        style: {
            width: '100%',
        },
    };

    const tPropsManNom = {
        treeData: managementNomenclatureData,
        value: managementNomenclatureValue,
        onChange: (val: any) => onTreeChange(val, manNomLeys),
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: t('WithDocuments.DetailFilters.ManagementNomenclature'),
        style: {
            width: '100%',
        },
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
                {/**************** Фильтр "11 Номенклатура товарной модели" *****************/}
                <TreeSelect {...tPropsProdNom} />
                {/**************** Фильтр "12 Управленческая номенклатура" *****************/}
                <TreeSelect {...tPropsManNom} />
            </Grid>
        </Grid>
    );
};

export default ProductsAdditionalFilter;
