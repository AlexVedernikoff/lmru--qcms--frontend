import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import NomenclatureRow from '../Common/NomenclatureRow';
import TextBlock from '../Common/TextBlock';
import styles from '../../Common.module.css';

const ModelDetailsMainData: React.FC = () => {
    const {t} = useTranslation('models');

    const nomenclatureName = 'Колоранты для колеровочных машин';

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <Typography variant="h3">{t('ModelDetails.MainData.Title')}</Typography>
            <TextBlock label={t('ModelDetails.MainData.Field.nomenclature')} text={nomenclatureName} />
            <br />
            <NomenclatureRow code={''} />
        </Grid>
    );
};

export default ModelDetailsMainData;
