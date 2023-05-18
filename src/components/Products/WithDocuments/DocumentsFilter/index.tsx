import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DatePicker, Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import DocumentsAdditionalFilter from './DocumentsAdditionalFilter';
import styles from '../../../Common.module.css';

const DocumentsFilter: React.FC = () => {
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
                        label={t('WithDocuments.Filters.filter')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text={t('WithDocuments.Filters.productCode')} value={'productCode'} />
                        <DropdownItem text={t('WithDocuments.Filters.providerName')} value={'providerName'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filter'}
                        value={undefined}
                        onChange={handleProductCodeChange}
                    />

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.RegulatoryStatus')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="25px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.DocumentType')}
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
                        label={t('WithDocuments.Filters.FileName')}
                        name={'qualityModel'}
                        placeholder=""
                        value={undefined}
                        onChange={handleProductCodeChange}
                    />

                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.DocumentStatus')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap="14px">
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('WithDocuments.Filters.ComplianceStatus')}
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
                        label={t('WithDocuments.Filters.DateSearch')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <DatePicker onChange={() => { }}
                        datePlaceholder='ДД/ММ/ГГГГ -ДД/ММ/ГГГГ'
                        label={t('WithDocuments.Filters.Dates')}
                        dateMask={"ДД/ММ/ГГГГ -ДД/ММ/ГГГГ"}
                        />
                </Grid>
            </Grid>

            {isMoreFiltersActive && (
                <Grid columnGap={16} columns="1fr" alignItems="center">
                    <DocumentsAdditionalFilter />
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

export default DocumentsFilter;
