import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, Input, RegularButton, Typography} from 'fronton-react';
import styles from '../../Products.module.css';

const ProductsFilter: React.FC = () => {
    const {t} = useTranslation('products');

    const handleProductCodeChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="12px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithoutModels.Filters.nomenclature')}
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
                        label={t('WithoutModels.Filters.regulatoryStatus')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="32px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithoutModels.Filters.QE')}
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
                            {t('WithoutModels.Filters.fromProject')}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid columnGap={16} columns="2fr" alignItems="baseline" rowGap="20px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder="Выберите"
                        label={t('WithoutModels.Filters.filter')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filter'}
                        value={undefined}
                        onChange={handleProductCodeChange}
                    />
                </Grid>
            </Grid>

            <Grid columnGap={16} columns="repeat(6, 1fr)" alignItems="baseline">
                <span />
                <span />
                <span />
                <span />
                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={() => {}} size="m" variant="outline">
                        Очистить
                    </RegularButton>

                    <RegularButton onClick={() => {}} size="m" variant="primary">
                        Поиск
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsFilter;
