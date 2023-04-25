import {BackofficeStatus, Grid, Textarea, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Table} from 'antd';
import styles from '../ProductDetails.module.css';

const ProductDetailsQualityStatusSection: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid className={styles.section} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
                    <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Title')}</Typography>

                    <Typography variant="m" size="body_long">
                        <BackofficeStatus align="left" text="" variant={'default'} />
                        {t('ProductDetails.QualityStatusSection.Table.Empty')}
                    </Typography>

                    <Table columns={[]} dataSource={[]} pagination={false} size="small" />
                </Grid>
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Comments')}</Typography>
                <Textarea />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsQualityStatusSection;
