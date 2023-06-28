import {DatePicker, Dropdown, DropdownItem, Grid, Input, Typography} from 'fronton-react';
import {IFilterFormState} from '.';
import CustomCheckbox from '../../../Common/CustomCheckbox/CustomCheckbox';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import React from 'react';

interface IProps {
    formState: IFilterFormState;
    setFormState: (state: IFilterFormState) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const ProductsAdditionalFilter: React.FC<IProps> = ({formState, setFormState, handleInputChange}) => {
    const {t} = useTranslation('products');
    const [filterSearchDate, setFilterSearchDate] = useState<string>();

    const handleSelect = (name: string) => (value: string | null) => {
        setFormState({...formState, [name]: value!});
    };

    const handleCheckboxChange = (value: boolean | undefined, name?: string) => {
        if (name) {
            setFormState({...formState, [name]: value});
        }
    };

    return (
        <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline">
            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Товар</Typography>

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={'BU'}
                    name={'buCode'}
                    placeholder=""
                    value={formState.buCode!}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={'Обязательный атрибут'}
                    name={'attributeCode'}
                    placeholder={'Ввод'}
                    value={formState.attributeCode}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={'Значение'}
                    name={'value'}
                    placeholder={'Ввод'}
                    value={formState.value}
                    onChange={handleInputChange}
                />

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={'Гамма'}
                    name={'range'}
                    placeholder={'Ввод'}
                    value={formState.range}
                    onChange={handleInputChange}
                />

                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name=""
                        value={formState.project}
                        onChange={handleCheckboxChange}
                        label="Из проекта"
                    />
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name=""
                        value={formState.project}
                        onChange={handleCheckboxChange}
                        label="Без трансфера"
                    />
                </Grid>
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Подробная информация</Typography>
                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name=""
                        value={formState.project}
                        onChange={handleCheckboxChange}
                        label="Активные товары"
                    />
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox name="mdd" value={formState.mdd} onChange={handleCheckboxChange} label="СТМ" />
                </Grid>

                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name="import"
                        value={formState.import}
                        onChange={handleCheckboxChange}
                        label="Международный импорт"
                    />
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name=""
                        value={formState.project}
                        onChange={handleCheckboxChange}
                        label="Отсутствуют данные о товаре"
                    />
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name=""
                        value={formState.project}
                        onChange={handleCheckboxChange}
                        label="Ожидают запуска квалификации"
                    />
                </Grid>
                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name=""
                        value={formState.project}
                        onChange={handleCheckboxChange}
                        label="Ожидают запуска сертификации"
                    />
                </Grid>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Тип проекта'}
                    value={undefined}
                    onSelect={handleSelect('')}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Блокировка'}
                    value={undefined}
                    onSelect={handleSelect('')}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
                <Grid columnGap={16} columns="120px 1fr" alignItems="center" alignContent="baseline">
                    <CustomCheckbox
                        name="isProductWithSubstance"
                        value={formState.isProductWithSubstance}
                        onChange={handleCheckboxChange}
                        label="Относится к категории химии"
                    />
                </Grid>
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'Содержит соединение'}
                    value={undefined}
                    onSelect={handleSelect('')}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Подробная информация</Typography>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={'Поиск по дате'}
                    value={filterSearchDate}
                    onSelect={function changeSelect(value) {
                        // console.log(value, 'VALUE');
                        value && setFilterSearchDate(value);
                    }}
                >
                    <DropdownItem text={'Дата создания'} value={'CREATED'} />
                    <DropdownItem text={'Дата последнего обновления'} value={'UPDATED'} />
                    <DropdownItem text={'Дата создания документа'} value={'ISSUE'} />
                    <DropdownItem text={'Дата окончания действия'} value={'EXPIRY'} />
                </Dropdown>
                <DatePicker
                    onChange={() => {}}
                    datePlaceholder="ДД/ММ/ГГГГ -ДД/ММ/ГГГГ"
                    label={'Даты'}
                    dateMask={'ДД/ММ/ГГГГ -ДД/ММ/ГГГГ'}
                />

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder="Выберите"
                    label={'С документом, срок действия которого истекает через:'}
                    value={undefined}
                    onSelect={handleSelect('')}
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
