import {Dropdown, DropdownItem, Grid, Input, Typography} from 'fronton-react';
import { useTranslation } from 'react-i18next';
import { CustomSwitch } from '../../../Common/Switch/CustomSwitch';
import { useState } from 'react';

const ProductsAdditionalFilter: React.FC = () => {
    const {t} = useTranslation('products');

    const [checked, setChecked] = useState(false);
    const handleChange = () => setChecked(!checked)
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid columnGap={16} columns="repeat(2, 1fr)" alignItems="baseline">
            <Grid rowGap={16} columns="1fr" alignItems="baseline">

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('WithDocuments.DetailFilters.QE')}
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
                    placeholder="Выберите"
                    label={t('WithDocuments.DetailFilters.Country')}
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
                    placeholder="Выберите"
                    label={t('WithDocuments.DetailFilters.QualityModel')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('WithDocuments.DetailFilters.ProductModelNomenclature')}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('WithDocuments.DetailFilters.ManagementNomenclature')}
                    placeholder={t('Common.Input')}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Grid columns='0.5fr 0.3fr'>
                    <CustomSwitch handleChange={handleChange} name={t('WithDocuments.DetailFilters.IncludingOutdatedDocuments')} checked={checked} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsAdditionalFilter;
