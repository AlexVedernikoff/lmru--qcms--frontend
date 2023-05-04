import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../Common.module.css';
import NomenclatureRow from '../Common/NomenclatureRow';
import {MODEL_TABLE_ITEMS} from '../../../common/mocks';

const data = MODEL_TABLE_ITEMS[0];

const ModelDetailsMainData: React.FC = () => {
    const {t} = useTranslation('models');

    const nomenclatureName = 'Колоранты для колеровочных машин';

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <Typography variant="h3">{t('ModelDetails.MainData.Title')}</Typography>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ModelDetails.MainData.Field.nomenclature')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {nomenclatureName}
                </Typography>
            </div>

            <br />

            <NomenclatureRow data={data.nomenclature} />
        </Grid>
    );
};

export default ModelDetailsMainData;
