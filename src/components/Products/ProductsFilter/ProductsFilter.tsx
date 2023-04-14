import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import styles from './ProductsFilter.module.css';
import {TableFields} from '../consts';

const ProductsFilter: React.FC = () => {
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

            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline">
                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={() => {}} size="l" variant="secondary">
                        Больше
                    </RegularButton>
                </Grid>

                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={() => {}} size="l" variant="secondary">
                        Очистить
                    </RegularButton>

                    <RegularButton onClick={() => {}} size="l" variant="primary">
                        Поиск
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsFilter;
