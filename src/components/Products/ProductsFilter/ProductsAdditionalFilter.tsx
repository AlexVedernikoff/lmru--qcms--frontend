import {Checkbox, Dropdown, DropdownItem, Grid, Input, Typography} from 'fronton-react';

const ProductsAdditionalFilter: React.FC = () => {
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline">
            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Товар</Typography>

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'BU'}
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
                    label={'Менеджер по качеству'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Input
                    inputSize="l"
                    autoComplete="off"
                    label={'Характеристика'}
                    name={'characteristics'}
                    placeholder={'Ввод'}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="l"
                    autoComplete="off"
                    label={'Значение'}
                    name={'value'}
                    placeholder={'Ввод'}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="l"
                    autoComplete="off"
                    label={'Гамма'}
                    name={'gamma'}
                    placeholder={'Ввод'}
                    value={undefined}
                    onChange={handleInputChange}
                />

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Из проекта
                    </Typography>
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Без трансфера
                    </Typography>
                </Grid>
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Подробная информация</Typography>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Активные товары
                    </Typography>
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        СТМ
                    </Typography>
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Международный импорт
                    </Typography>
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Отсутствуют данные о товаре
                    </Typography>
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Ожидают запуска квалификации
                    </Typography>
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Ожидают запуска сертификации
                    </Typography>
                </Grid>

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Тип проекта'}
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
                    label={'Блокировка'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Grid columnGap={16} columns="120px 1fr" alignItems="baseline" alignContent="baseline">
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={'Да'} />
                        <Checkbox checked={false} label={'Нет'} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        Относится к категории химии
                    </Typography>
                </Grid>

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Содержит соединение'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Подробная информация</Typography>

                <Dropdown
                    size="l"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Поиск по дате'}
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
                    label={'Дата'}
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
                    label={'С документом, срок действия которого истекает через:'}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>
        </Grid>
    );
};

export default ProductsAdditionalFilter;
