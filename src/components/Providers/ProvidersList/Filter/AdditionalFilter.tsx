import {Checkbox, Dropdown, DropdownItem, Grid, Typography, Input} from 'fronton-react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
// import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import {IModelNomenclature} from '../../../../common/types/providers';
// import {useGetProductModelNomenclatureQuery} from '../../../../api/getProductModelNomenclature';
// import {useGetManagementNomenclatureQuery} from '../../../../api/getManagementNomenclature';
// import {IProductModelNomenclatureResponse} from '../../../../common/types/productModelNomenclature';
// import {IManagementNomenclatureResponse} from '../../../../common/types/productManagementNomenclature';
import {TRootState} from '../../../../store/index';
import {setSuppliersFilter, ISuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';
import {СustomTreeSelect} from '../../../Common/CustomTreeSelect';

type Props = {
    modelNomenclature: IModelNomenclature | undefined;
    handleFiltersAdditional: (filters: string[]) => void;
};

const AdditionalFilter: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const {t} = useTranslation('providers');

    const suppliersFilterState: ISuppliersFilter = useSelector((state: TRootState) => state.suppliersFilter);

    const onHandleFilterChange = (e: ISuppliersFilter[keyof ISuppliersFilter], k: string) => {
        dispatch(setSuppliersFilter([e, k]));
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

    // const productNomenclatureData = productModelNomenclature.map((el: IProductModelNomenclatureResponse) => {
    //     return {
    //         title: el.nameRu,
    //         value: `${modNomKeys[0]} ${el.code}`,
    //         children: el.subdepartments.map(subDep => {
    //             return {
    //                 title: subDep.nameRu,
    //                 value: `${modNomKeys[1]} ${subDep.code}`,
    //                 children: subDep.modelConsolidationGroups.map(modCon => {
    //                     return {
    //                         title: modCon.nameRu,
    //                         value: `${modNomKeys[2]} ${modCon.code}`,
    //                         children: modCon.models
    //                             ? modCon.models.map(mod => {
    //                                   return {
    //                                       title: mod.nameRu,
    //                                       value: `${modNomKeys[3]} ${mod.code}`,
    //                                   };
    //                               })
    //                             : undefined,
    //                     };
    //                 }),
    //             };
    //         }),
    //     };
    // });

    // const managementNomenclatureData = managementNomenclature.map((el: IManagementNomenclatureResponse) => {
    //     return {
    //         title: el.name,
    //         value: `${manNomLeys[0]} ${el.id}`,
    //         children: el.subDepartments.map(subDep => {
    //             return {
    //                 title: subDep.name,
    //                 value: `${manNomLeys[1]} ${subDep.id}`,
    //                 children: subDep.types
    //                     ? subDep.types.map(modCon => {
    //                           return {
    //                               title: modCon.name,
    //                               value: `${manNomLeys[2]} ${modCon.id}`,
    //                               children: modCon.subTypes
    //                                   ? modCon.subTypes.map(mod => {
    //                                         return {
    //                                             title: mod.name,
    //                                             value: `${manNomLeys[3]} ${mod.id}`,
    //                                         };
    //                                     })
    //                                   : undefined,
    //                           };
    //                       })
    //                     : undefined,
    //             };
    //         }),
    //     };
    // });

    const treeSelectValue = (keys: string[]) =>
        keys.reduce((acc: string[], key) => {
            const idsArr: string[] = suppliersFilterState[key as keyof ISuppliersFilter] as string[];
            if (idsArr) acc.push(...idsArr.map((el: any) => `${key} ${el}`));
            return acc;
        }, []);

    // function treeSelectValue<T = string>(keys: string[], state: T) {
    //     return keys.reduce((acc: string[], key) => {
    //         const idsArr: string[] = state[key] as string[];
    //         if (idsArr) acc.push(...idsArr.map((el: any) => `${key} ${el}`));
    //         return acc;
    //     }, []);
    // }
    // keys: string[] //обобщить функцию дженериком?

    // function treeSelectValue<T>(keys: string[], state: T) {
    //     return keys.reduce((acc: string[], key) => {
    //         const idsArr: string[] = state[key as keyof T] as string[];
    //         if (idsArr) acc.push(...idsArr.map((el: any) => `${key} ${el}`));
    //         return acc;
    //     }, []);
    // }

    // const modelNomenclatureValue = treeSelectValue<ISuppliersFilter>(modNomKeys, suppliersFilterState); // передать через пропсы?
    // const managementNomenclatureValue = treeSelectValue<ISuppliersFilter>(manNomLeys, suppliersFilterState);

    const modelNomenclatureValue = treeSelectValue(modNomKeys); // передать через пропсы?
    const managementNomenclatureValue = treeSelectValue(manNomLeys);

    const onTreeChange = (newValue: any, keys: any) => {
        // передать через пропсы? у каждого эта функция, меняющая стейт, своя.
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

    // const tPropsProdNom = {
    //     treeData: productNomenclatureData,
    //     value: modelNomenclatureValue,
    //     onChange: (val: any) => onTreeChange(val, modNomKeys),
    //     treeCheckable: true,
    //     showCheckedStrategy: SHOW_PARENT,
    //     placeholder: t('ProvidersList.DetailFilters.productModelNomenclature'),
    //     style: {
    //         width: '100%',
    //     },
    // };

    // const tPropsManNom = {
    //     treeData: managementNomenclatureData,
    //     value: managementNomenclatureValue,
    //     onChange: (val: any) => onTreeChange(val, manNomLeys),
    //     treeCheckable: true,
    //     showCheckedStrategy: SHOW_PARENT,
    //     placeholder: t('ProvidersList.DetailFilters.managementNomenclature'),
    //     style: {
    //         width: '100%',
    //     },
    // };

    const {qualityRating} = suppliersFilterState;

    // const {modelNomenclature, handleFiltersAdditional} = props;
    // const [checked, setChecked] = useState(false);

    // const handleChange = () => setChecked(!checked);
    // const handleSelect = (value: string | null) => {};
    // const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    // const [value, setValue] = useState<string[]>();

    // const onChange = (newValue: string[]) => {
    //     setValue(newValue);
    //     handleFiltersAdditional(newValue);
    // };

    return (
        <Grid columnGap={24} columns="repeat(4, 1fr)" alignItems="baseline">
            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Typography variant="l" size="body_accent">
                    {t('ProvidersList.DetailFilters.relatedProducts')}
                </Typography>
                {/**************** Фильтр "11 Номенклатура товарной модели" *****************/}
                <СustomTreeSelect
                    type={'product'}
                    nomenclatureValue={modelNomenclatureValue}
                    handleChange={onTreeChange}
                />
                {/**************** Фильтр "12 Управленческая номенклатура" *****************/}
                <СustomTreeSelect
                    type={'management'}
                    nomenclatureValue={managementNomenclatureValue}
                    handleChange={onTreeChange}
                />
                {/* <TreeSelect {...tPropsManNom} /> */}
                {/**************** Экспериментальный кастомный компонент *****************/}
                {/* <СustomTreeSelect
                    type={'product'}
                    nomenclatureValue={managementNomenclatureValue}
                    handleChange={onTreeChange}
                /> */}

                {/* modelNomenclatureValue = treeSelectValue(modNomKeys); // передать через пропсы?
    const managementNomenclatureValue = treeSelectValue(manNomLeys); */}

                {/**************** Фильтр "07 Модель качества" *****************/}

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('ProvidersList.DetailFilters.qualityModel')}
                    placeholder={t('Common.Input')}
                    value={qualityRating}
                    onChange={e => {
                        onHandleFilterChange(e.target.value, 'qualityRating');
                    }}
                />

                {/**************** Фильтр "" *****************/}

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.certificationStatus')}
                    value={undefined}
                    // // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <div></div>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.сharacteristic')}
                    value={undefined}
                    // // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.meaning')}
                    value={undefined}
                    // // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t('Common.Yes')} />
                        <Checkbox checked={false} label={t('Common.No')} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('ProvidersList.DetailFilters.withCTMProduct')}
                    </Typography>
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t('Common.Yes')} />
                        <Checkbox checked={false} label={t('Common.No')} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('ProvidersList.DetailFilters.productDistributorOnly')}
                    </Typography>
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t('Common.Yes')} />
                        <Checkbox checked={false} label={t('Common.No')} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('ProvidersList.DetailFilters.withoutСontact')}
                    </Typography>
                </Grid>
            </Grid>

            <Grid rowGap={24} columns="fr" alignItems="baseline">
                {/* <Typography variant="l" size="body_accent">
                    {t('ProvidersList.DetailFilters.actions')}
                </Typography>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.type')}
                    value={undefined}
                    // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.selfAssessmentStatus')}
                    value={undefined}
                    // // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.platform')}
                    value={undefined}
                    // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.qualityEngineer')}
                    value={undefined}
                    // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown> */}
            </Grid>

            <Grid rowGap={24} columns="fr" alignItems="baseline">
                {/* <div></div>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.contractor')}
                    value={undefined}
                    // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.Filters.dateSearch')}
                    value={undefined}
                    // onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <DatePicker
                    onChange={() => {}}
                    datePlaceholder="ДД/ММ/ГГГГ -ДД/ММ/ГГГГ"
                    label={t('ProvidersList.Filters.dates')}
                    dateMask={'ДД/ММ/ГГГГ -ДД/ММ/ГГГГ'}
                />

                <CustomSwitch
                    handleChange={() => {}}
                    checked={true}
                    name={t('ProvidersList.DetailFilters.PendingСreation')}
                /> */}
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
