import {Checkbox, Dropdown, DropdownItem, Grid, Typography, Input, DatePicker} from 'fronton-react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
// import {useState} from 'react';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import {IModelNomenclature} from '../../../../common/types/providers';
import {TreeSelect} from 'antd';
import {useGetProductModelNomenclatureQuery} from '../../../../api/getProductModelNomenclature';
import {useGetManagementNomenclatureQuery} from '../../../../api/getManagementNomenclature';
import {IProductModelNomenclatureResponse} from '../../../../common/types/productModelNomenclature';
import {IManagementNomenclatureResponse} from '../../../../common/types/productManagementNomenclature';
import {TRootState} from '../../../../store/index';
import {setSuppliersFilter, ISuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';

type Props = {
    modelNomenclature: IModelNomenclature | undefined;
    handleFiltersAdditional: (filters: string[]) => void;
};

const {SHOW_PARENT} = TreeSelect;

const AdditionalFilter: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const {t} = useTranslation('providers');

    const {data: productModelNomenclature = []} = useGetProductModelNomenclatureQuery();
    const {data: managementNomenclature = []} = useGetManagementNomenclatureQuery();

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

    const {} = suppliersFilterState;

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
                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('ProvidersList.DetailFilters.managementNomenclature')}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                {modelNomenclature && (
                    <TreeSelect
                        showSearch
                        style={{width: '100%'}}
                        value={value}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        placeholder={t('ProvidersList.DetailFilters.productModelNomenclature')}
                        allowClear
                        treeCheckable
                        showCheckedStrategy={SHOW_PARENT}
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={modelNomenclature.map((el, i) => {
                            return {
                                value: `modelDepartmentId ${el.code}`,
                                title: el.code,
                                children: el.subdepartments.map((el, i) => {
                                    return {
                                        value: `modelSubDepartmentId ${el.code}`,
                                        title: el.code,
                                        children: el.modelConsolidationGroups.map((el, i) => {
                                            return {
                                                value: `modelConsolidationId ${el.code}`,
                                                title: el.code,
                                                children: el.models?.map((el, i) => {
                                                    return {
                                                        value: `modelCodeId ${el.code}`,
                                                        title: el.code,
                                                    };
                                                }),
                                            };
                                        }),
                                    };
                                }),
                            };
                        })}
                    />
                )}

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('ProvidersList.DetailFilters.qualityModel')}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.certificationStatus')}
                    value={undefined}
                    onSelect={handleSelect}
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
                    onSelect={handleSelect}
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
                    onSelect={handleSelect}
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
                <Typography variant="l" size="body_accent">
                    {t('ProvidersList.DetailFilters.actions')}
                </Typography>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.type')}
                    value={undefined}
                    onSelect={handleSelect}
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
                    onSelect={handleSelect}
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
                    onSelect={handleSelect}
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
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={24} columns="fr" alignItems="baseline">
                <div></div>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ProvidersList.DetailFilters.contractor')}
                    value={undefined}
                    onSelect={handleSelect}
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
                    onSelect={handleSelect}
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
                    handleChange={handleChange}
                    checked={checked}
                    name={t('ProvidersList.DetailFilters.PendingСreation')}
                />
            </Grid>
        </Grid>
    );
};

export default AdditionalFilter;
