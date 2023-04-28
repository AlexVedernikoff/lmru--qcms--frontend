import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import ProductsAdditionalFilter from './ProductsAdditionalFilter';
import styles from '../../../Common.module.css';

const ProductsFilter: React.FC = () => {
    const {t} = useTranslation('products');
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleProductCodeChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap="48px">
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithModels.Filters.filter')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text={t('WithModels.Filters.productCode')} value={'productCode'} />
                        <DropdownItem text={t('WithModels.Filters.providerName')} value={'providerName'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filter'}
                        value={undefined}
                        onChange={handleProductCodeChange}
                    />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithModels.Filters.nomenclature')}
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
                        label={t('WithModels.Filters.qualityModel')}
                        name={'qualityModel'}
                        placeholder=""
                        value={undefined}
                        onChange={handleProductCodeChange}
                    />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={'Статус качества'}
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
                        label={'Статус поставщика'}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>
                </Grid>
            </Grid>

            {isMoreFiltersActive && (
                <Grid columnGap={16} columns="1fr" alignItems="center">
                    <ProductsAdditionalFilter />
                </Grid>
            )}

            <Grid columnGap={16} columns="repeat(6, 1fr)" alignItems="baseline">
                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton
                        onClick={handleShowMoreFiltersClick}
                        size="m"
                        variant="pseudo"
                        iconLeft={isMoreFiltersActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    >
                        {isMoreFiltersActive ? t('Buttons.Less') : t('Buttons.More')}
                    </RegularButton>
                </Grid>

                <span />
                <span />
                <span />
                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={() => {}} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton onClick={() => {}} size="m" variant="primary">
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsFilter;
