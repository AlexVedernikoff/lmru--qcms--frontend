import {Grid, Typography} from 'fronton-react';
import styles from '../ProductDetails.module.css';

const ProductDetailsInfo: React.FC = () => (
    <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
        <Typography variant="h3">{'Подробная информация'}</Typography>

        <div>
            <Typography variant="s" size="body_long" color="text-minor">
                {'Гамма'}
            </Typography>
            <br />
            <Typography variant="s" size="body_short">
                {'Предварительная ссылка'}
            </Typography>
        </div>
    </Grid>
);

export default ProductDetailsInfo;
