import {BackofficeStatus, Grid, Textarea, Typography} from 'fronton-react';
import {Table} from 'antd';
import styles from '../ProductDetails.module.css';

const ProductDetailsQualityStatusSection: React.FC = () => {
    return (
        <Grid className={styles.section} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
                    <Typography variant="h3">{'Статус качества'}</Typography>
                    <Typography variant="m" size="body_long">
                        <BackofficeStatus align="left" text="" variant={'default'} />
                        {'Контактные данные поставщика отсутствуют'}
                    </Typography>
                    <Table columns={[]} dataSource={[]} pagination={false} />
                </Grid>
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{'Публичные комментарии'}</Typography>
                <Textarea />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsQualityStatusSection;
