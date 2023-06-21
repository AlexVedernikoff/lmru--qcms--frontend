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

    const productNomenclatureData = productModelNomenclature.map((el: IProductModelNomenclatureResponse) => {
        return {
            title: el.code,
            value: `modelDepartmentId ${el.code}`,
            children: el.subdepartments.map(subDep => {
                return {
                    title: subDep.code,
                    value: `modelSubDepartmentId ${subDep.code}`,
                    children: subDep.modelConsolidationGroups.map(modCon => {
                        return {
                            title: modCon.code,
                            value: `modelConsolidationId ${modCon.code}`,
                            children: modCon.models
                                ? modCon.models.map(mod => {
                                      return {
                                          title: mod.code,
                                          value: `modelCodeId ${mod.code}`,
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
            value: `productManagementNomenclatureDepartmentId ${el.id} ${el.name.replace(/\s/g, '_')}`,
            children: el.subDepartments.map(subDep => {
                return {
                    title: subDep.name,
                    value: `productManagementNomenclatureSubdepartmentId ${el.id} ${subDep.name.replace(/\s/g, '_')}`,
                    children: subDep.types
                        ? subDep.types.map(modCon => {
                              return {
                                  title: modCon.name,
                                  value: `productManagementNomenclatureTypeId ${el.id} ${modCon.name.replace(
                                      /\s/g,
                                      '_'
                                  )}`,
                                  children: modCon.subTypes
                                      ? modCon.subTypes.map(mod => {
                                            return {
                                                title: mod.name,
                                                value: `productManagementNomenclatureSubtypeId ${
                                                    el.id
                                                } ${mod.name.replace(/\s/g, '_')}`,
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

    console.log('!!!!!!!!!!!!!!!managementNomenclatureData = ', managementNomenclatureData);

    const {t} = useTranslation('products');

    const [checked, setChecked] = useState(false);
    const handleChange = () => setChecked(!checked);
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const {SHOW_PARENT} = TreeSelect;
    const modNomKeys = ['modelDepartmentId', 'modelSubDepartmentId', 'modelConsolidationId', 'modelCodeId'];

    const keys = ['modelDepartmentId', 'modelSubDepartmentId', 'modelConsolidationId', 'modelCodeId'];

    const manNomLeys = [
        'productManagementNomenclatureDepartmentId',
        'productManagementNomenclatureSubdepartmentId',
        'productManagementNomenclatureTypeId',
        'productManagementNomenclatureSubtypeId',
    ];

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

        console.log('keys if function = ', keys);
        const result = newValue.reduce((acc: any, el: any) => {
            // const [key, value] = el.split(' ');
            const key = el.split(' ')[0];
            const value = el.split(' ').slice(1).join(' ');
            console.log('!!!!!!key, value = ', key, value);
            console.log('acc[key] = ', acc[key]);
            if (!acc[key]) acc[key] = [];
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

    return (
        <Grid columnGap={16} columns="repeat(2, 1fr)" alignItems="baseline">
            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                {/**************** Фильтр "09 QE" *****************/}
                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('WithDocuments.DetailFilters.QE')}
                    name={'approvedBy'}
                    placeholder=""
                    value={productsDocumentsFiltersState.approvedBy}
                    onChange={e => {
                        onHandleFilterChange(e.target.value, 'approvedBy');
                    }}
                />

                {/**************** Фильтр "10 Страна" *****************/}
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder="Выберите"
                    label={t('WithDocuments.DetailFilters.Country')}
                    value={productsDocumentsFiltersState.country}
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
                    value={String(productsDocumentsFiltersState.qualityModelId)}
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
                    <CustomSwitch
                        handleChange={handleChange}
                        name={t('WithDocuments.DetailFilters.IncludingOutdatedDocuments')}
                        checked={checked}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsAdditionalFilter;
