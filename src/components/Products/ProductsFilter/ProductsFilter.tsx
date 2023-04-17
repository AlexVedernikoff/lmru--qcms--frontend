import {useState} from 'react';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import styles from './ProductsFilter.module.css';
import {TableFields} from '../consts';
import ProductsAdditionalFilter from './ProductsAdditionalFilter';

const ProductsFilter: React.FC = () => {
    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleProductCodeChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid rowGap={16} alignItems="center" className={styles.filterPanel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline">
                <Input
                    inputSize="l"
                    autoComplete="off"
                    label={TableFields.productCode.label}
                    name={TableFields.productCode.field}
                    placeholder={TableFields.productCode.label}
                    value={undefined}
                    onChange={handleProductCodeChange}
                />

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Номенклатура'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Статус качества'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline">
                <Input
                    inputSize="l"
                    autoComplete="off"
                    label={TableFields.providerName.label}
                    name={TableFields.providerName.field}
                    placeholder=""
                    value={undefined}
                    onChange={handleProductCodeChange}
                />

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Модель качества'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Статус поставщика'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
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
                        {isMoreFiltersActive ? 'Меньше' : 'Больше'}
                    </RegularButton>
                </Grid>

                <span />
                <span />
                <span />
                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={() => {}} size="m" variant="secondary">
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
