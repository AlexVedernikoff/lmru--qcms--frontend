import {Dropdown, DropdownItem, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../Common.module.css';

const ModelDetailsQualityManager: React.FC = () => {
    const {t} = useTranslation('models');

    const handleSelect = (value: string | null) => {};

    return (
        <Grid className={styles.sectionItem} rowGap={4} columnGap={24}>
            <Grid>
                <Typography variant="h3">{t('ModelDetails.QualityManager.Title')}</Typography>
            </Grid>

            <Grid columnGap={24} columns="repeat(3, 1fr)">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelDetails.QualityManager.Field.BU')}
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
                    label={t('ModelDetails.QualityManager.Field.QE')}
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
                    label={t('ModelDetails.QualityManager.Field.SCM')}
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

export default ModelDetailsQualityManager;
