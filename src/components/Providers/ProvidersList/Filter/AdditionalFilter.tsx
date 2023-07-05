import {Checkbox, Dropdown, DropdownItem, Grid, Typography, Input} from 'fronton-react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {TRootState} from '../../../../store/index';
import {setSuppliersFilter, ISuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';
import {СustomTreeSelect, TNomenclatureValue} from '../../../Common/CustomTreeSelect';
import {modNomKeys, manNomKeys} from '../../../Common/CustomTreeSelect/consts';

const AdditionalFilter: React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation('providers');

    const suppliersFilterState: ISuppliersFilter = useSelector((state: TRootState) => state.suppliersFilter);

    const onHandleFilterChange = (e: ISuppliersFilter[keyof ISuppliersFilter], k: string) => {
        dispatch(setSuppliersFilter([e, k]));
    };

    const treeSelectValue = (keys: string[]) => {
        const result: TNomenclatureValue = {};
        for (let key of keys) {
            result[key] = (suppliersFilterState[key as keyof ISuppliersFilter] as string[]) || [];
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

    const {qualityRating} = suppliersFilterState;

    return (
        <Grid columnGap={24} columns="repeat(4, 1fr)" alignItems="baseline">
            <Grid rowGap={24} columns="1fr" alignItems="baseline">
                <Typography variant="l" size="body_accent">
                    {t('ProvidersList.DetailFilters.relatedProducts')}
                </Typography>
                {/**************** Фильтр "11 Номенклатура товарной модели" *****************/}
                <СustomTreeSelect nomenclatureValue={modelNomenclatureValue} handleChange={onTreeChange} />
                {/**************** Фильтр "12 Управленческая номенклатура" *****************/}
                <СustomTreeSelect nomenclatureValue={managementNomenclatureValue} handleChange={onTreeChange} />

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
