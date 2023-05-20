import {useTranslation} from 'react-i18next';
import {Checkbox, Dropdown, DropdownItem, Grid, Input, RegularButton, Typography} from 'fronton-react';
import styles from '../../Common.module.css';

const TransferFilter: React.FC = () => {
    const {t} = useTranslation('products');

    const handleProductCodeChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};

    const handleSelect = (value: string | null) => {};

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={24} columns="repeat(4, 1fr)" alignItems="baseline" rowGap={48}>
                <Grid columnGap={16} columns="2fr" alignItems="baseline" rowGap={20}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('Transfer.Filters.filter')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem
                            text={t('Transfer.Filters.productName')}
                            value={t('Transfer.Filters.productName')}
                        />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        name={'filter'}
                        value={undefined}
                        onChange={handleProductCodeChange}
                    />
                </Grid>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('Transfer.Filters.providerStatus')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('Transfer.Filters.QE')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                    <DropdownItem text="test" value={'test'} />
                </Dropdown>

                <Grid columnGap={16} columns="120px auto" className={styles.justifyItemsStart}>
                    <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="baseline" alignContent="baseline">
                        <Checkbox checked={false} label={t('Common.Yes')} />
                        <Checkbox checked={false} label={t('Common.No')} />
                    </Grid>
                    <Typography variant="s" size="body_short">
                        {t('Transfer.Filters.activeProducts')}
                    </Typography>
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

export default TransferFilter;
