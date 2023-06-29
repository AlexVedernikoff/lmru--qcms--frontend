import {DatePicker, Dropdown, DropdownItem, Grid, Input, Typography} from 'fronton-react';
import {IFilterFormState} from '.';
import CustomCheckbox from '../../../Common/CustomCheckbox/CustomCheckbox';
import {useTranslation} from 'react-i18next';
import React from 'react';

interface IProps {
    formState: IFilterFormState;
    setFormState: (state: IFilterFormState) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export enum EDateType {
    createDate = 'CREATED',
    updateDate = 'UPDATED',
    issueDate = 'ISSUE',
    expireDate = 'EXPIRY',
}

const ProductsAdditionalFilter: React.FC<IProps> = ({formState, setFormState, handleInputChange}) => {
    const {t} = useTranslation('products');

    const handleSelect = (name: string) => (value: string | null) => {
        setFormState({...formState, [name]: value!});
    };

    const handleCheckboxChange = (value: boolean | undefined, name?: string) => {
        if (name) {
            setFormState({...formState, [name]: value});
        }
    };

    const onHandleFilterChange = (e: IFilterFormState, k?: string) => {
        setFormState({...formState, ...e});
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

                <CustomCheckbox
                    name="fromProject"
                    value={formState.fromProject}
                    onChange={handleCheckboxChange}
                    label="Из проекта"
                />

                <CustomCheckbox
                    name="withoutTransfer"
                    value={formState.withoutTransfer}
                    onChange={handleCheckboxChange}
                    label="Без трансфера"
                />
            </Grid>

            <Grid rowGap={16} columns="1fr" alignItems="baseline">
                <Typography variant="h3">Подробная информация</Typography>
                <CustomCheckbox
                    name="activeProducts"
                    value={formState.activeProducts}
                    onChange={handleCheckboxChange}
                    label="Активные товары"
                />

                <CustomCheckbox name="mdd" value={formState.mdd} onChange={handleCheckboxChange} label="СТМ" />

                <CustomCheckbox
                    name="import"
                    value={formState.import}
                    onChange={handleCheckboxChange}
                    label="Международный импорт"
                />

                <CustomCheckbox
                    name="dataForProduct"
                    value={formState.dataForProduct}
                    onChange={handleCheckboxChange}
                    label="Отсутствуют данные о товаре"
                />

                <CustomCheckbox
                    name="waitingQualification"
                    value={formState.waitingQualification}
                    onChange={handleCheckboxChange}
                    label="Ожидают запуска квалификации"
                />

                <CustomCheckbox
                    name="waitingCertification"
                    value={formState.waitingCertification}
                    onChange={handleCheckboxChange}
                    label="Ожидают запуска сертификации"
                />

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

                <CustomCheckbox
                    name="isProductWithSubstance"
                    value={formState.isProductWithSubstance}
                    onChange={handleCheckboxChange}
                    label="Относится к категории химии"
                />

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
                    value={formState.dateType}
                    onSelect={function changeSelect(value) {
                        const dateType = value as EDateType;
                        onHandleFilterChange({...formState, dateType});
                    }}
                >
                    <DropdownItem text={'Дата создания'} value={'CREATED'} />
                    <DropdownItem text={'Дата последнего обновления'} value={'UPDATED'} />
                    <DropdownItem text={'Дата создания документа'} value={'ISSUE'} />
                    <DropdownItem text={'Дата окончания действия'} value={'EXPIRY'} />
                </Dropdown>
                <DatePicker
                    date={[formState.startDate!, formState.endDate!]}
                    mode="range"
                    view="double"
                    onChange={function noRefCheck(e) {
                        const datesArr = [formState.startDate, formState.endDate];
                        const datesArrRemoveEmpty = datesArr.filter(el => el);

                        if (datesArrRemoveEmpty.length < 2) {
                            datesArrRemoveEmpty.push(e.slice(-1)[0]);
                        } else {
                            datesArrRemoveEmpty.splice(0, datesArrRemoveEmpty.length);
                            datesArrRemoveEmpty.push(e[0]);
                        }
                        datesArrRemoveEmpty.sort();
                        onHandleFilterChange({
                            startDate: datesArrRemoveEmpty[0],
                            endDate: datesArrRemoveEmpty[1],
                        });
                    }}
                    datePlaceholder="ДД/ММ/ГГГГ -ДД/ММ/ГГГГ"
                    label={'Даты'}
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
