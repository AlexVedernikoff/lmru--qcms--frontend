import {Checkbox, Dropdown, DropdownItem, Grid, Typography, Input, DatePicker} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import {IModelNomenclature} from '../../../../common/types/providers';
import {TreeSelect} from 'antd';

type Props = {
    modelNomenclature: IModelNomenclature | undefined;
    handleFiltersAdditional: (filters: string[]) => void;
};

const AdditionalFilter: React.FC<Props> = props => {
    const {t} = useTranslation('providers');
    const {SHOW_PARENT} = TreeSelect;
    const {modelNomenclature, handleFiltersAdditional} = props;
    const [checked, setChecked] = useState(false);

    const handleChange = () => setChecked(!checked);
    const handleSelect = (value: string | null) => {};
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const [value, setValue] = useState<string[]>();

    const onChange = (newValue: string[]) => {
        setValue(newValue);
        handleFiltersAdditional(newValue);
    };

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
