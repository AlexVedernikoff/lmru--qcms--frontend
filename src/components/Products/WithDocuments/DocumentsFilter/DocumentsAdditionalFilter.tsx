import {useState} from 'react';
import {setProductsDocumentsFilters} from '../../../../store/slices/productsDocumentsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown, DropdownItem, Grid, Input} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import {useGetProductModelNomenclatureQuery} from '../../../../api/getProductModelNomenclature';
import {IProductModelNomenclatureResponse} from '../../../../common/types/productModelNomenclature';
import {TreeSelect} from 'antd';
import {TRootState} from '../../../../store/index';
import {IFilters} from '../../../../store/slices/productsDocumentsSlice';
import {useGetManagementNomenclatureQuery} from '../../../../api/getManagementNomenclature';
import {IManagementNomenclatureResponse} from '../../../../common/types/productManagementNomenclature';

const ProductsAdditionalFilter: React.FC = () => {
    const dispatch = useDispatch();
    const {data: productModelNomenclature = [], isLoading: isLoadingPermissiveDocuments} =
        useGetProductModelNomenclatureQuery();

    const {data: managementNomenclature = [], isLoading: isLoadingManagementNomenclature} =
        useGetManagementNomenclatureQuery();

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

    // console.log('!!!!!!!!!!!!!!!managementNomenclatureData = ', managementNomenclatureData);

    const {t} = useTranslation('products');

    const [checked, setChecked] = useState(false);
    const handleChange = () => setChecked(!checked);
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const {SHOW_PARENT} = TreeSelect;

    const treeSelectValue = (keys: string[]) =>
        keys.reduce((acc: string[], key) => {
            const idsArr: string[] = productsDocumentsFiltersState[key as keyof IFilters] as string[];
            if (idsArr) acc.push(...idsArr.map((el: any) => `${key} ${el}`));
            return acc;
        }, []);

    const modelNomenclatureValue = treeSelectValue(modNomKeys);
    const managementNomenclatureValue = treeSelectValue(manNomLeys);

    // const initialAcc = keys.reduce((acc: any, key) => {
    //     acc[key] = [];
    //     return acc;
    // }, {});

    // console.log('modelNomenclatureValue = ', modelNomenclatureValue);
    // console.log('!!!!!!managementNomenclatureValue = ', managementNomenclatureValue);

    const onTreeChange = (newValue: any, keys: any) => {
        const initialAcc = keys.reduce((acc: any, key: any) => {
            acc[key] = [];
            return acc;
        }, {});

        // console.log('Мы работаем с массивом ключей = ', keys);
        // console.log('Мы работаем с массивом ключей = ', manNomLeys === keys);

        const result = newValue.reduce((acc: any, el: any) => {
            let [key, value] = el.split(' ');
            if (manNomLeys === keys) value = Number(value);
            // const key = el.split(' ')[0];
            // const value = el.split(' ').slice(1).join(' ');
            // console.log('!!!!!!key, value = ', key, value);
            // console.log('acc[key] = ', acc[key]);
            // if (!acc[key]) acc[key] = [];
            acc[key].push(value);
            return acc;
        }, initialAcc);
        console.log('result = ', result);
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
        placeholder: 'Номенклатура товарной модели',
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
                {/**************** Фильтр "09 QE" *****************/}
                {/**************** Скрыт по согласованию с Никитой Фёдоровым *****************/}
                {/* <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('WithDocuments.DetailFilters.QE')}
                    name={'approvedBy'}
                    placeholder=""
                    value={productsDocumentsFiltersState.approvedBy}
                    onChange={e => {
                        onHandleFilterChange(e.target.value, 'approvedBy');
                    }}
                /> */}

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

                {/* <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('WithDocuments.DetailFilters.ManagementNomenclature')}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                /> */}
                <Grid columns="0.5fr 0.3fr">
                    {/* Скрыто по согласованию с Никитой Фёдоровым */}
                    {/* <CustomSwitch
                        handleChange={handleChange}
                        name={t('WithDocuments.DetailFilters.IncludingOutdatedDocuments')}
                        checked={checked}
                    /> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsAdditionalFilter;
