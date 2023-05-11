import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {MODEL_TABLE_ITEMS} from '../../../common/mocks';
import styles from '../../Common.module.css';
import NomenclatureRow from '../Common/NomenclatureRow';
import TextBlock from '../Common/TextBlock';

const data = MODEL_TABLE_ITEMS[0];

const ModelDetailsMainData: React.FC = () => {
    const {t} = useTranslation('models');

    const nomenclatureName = 'Колоранты для колеровочных машин';

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <Typography variant="h3">{t('ModelDetails.MainData.Title')}</Typography>
            <TextBlock label={t('ModelDetails.MainData.Field.nomenclature')} text={nomenclatureName} />
            <br />
            <NomenclatureRow data={data.nomenclature} />
        </Grid>
    );
};

export default ModelDetailsMainData;
