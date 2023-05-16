import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip, Grid, Typography} from 'fronton-react';
import styles from './ModelDetails.module.css';

const ModelDetailsCharacteristics: React.FC = () => {
    const {t} = useTranslation('models');

    const [items, setItems] = useState([
        {
            label: t('ModelDetails.Characteristics.Field.percent'),
            value: '1',
        },
        {
            label: t('ModelDetails.Characteristics.Field.percent'),
            value: '1',
        },
        {
            label: t('ModelDetails.Characteristics.Field.eco'),
            value: '2',
        },
    ]);

    const handleChipDelete: React.MouseEventHandler<HTMLButtonElement> = e => {
        const {value} = e.currentTarget.dataset;
        setItems(current => current.filter(item => item.value !== value));
    };

    return (
        <Grid rowGap={16} columnGap={16} columns="1fr">
            <Typography variant="h3">{t('ModelDetails.Characteristics.Title')}</Typography>

            <div className={styles.flexRow}>
                {items.map((item, i) => (
                    <Chip
                        key={i}
                        text={item.label}
                        data-value={item.value}
                        variant="secondary"
                        onDelete={handleChipDelete}
                    />
                ))}
            </div>
        </Grid>
    );
};

export default ModelDetailsCharacteristics;
