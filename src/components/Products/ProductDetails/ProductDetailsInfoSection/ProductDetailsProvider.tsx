import {Grid, Typography} from 'fronton-react';
import styles from '../ProductDetails.module.css';

const ProductDetailsProvider: React.FC = () => (
    <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
        <Typography variant="h3">{'Поставщик'}</Typography>

        <div>
            <Typography variant="s" size="body_long" color="text-minor">
                {'Наименование поставщика'}
            </Typography>
            <br />
            <Typography variant="s" size="body_short">
                {'1000771901 - ООО "Сен-Гобен Строительная Продукция Рус"'}
            </Typography>
        </div>

        <br />

        <div>
            <Typography variant="s" size="body_long" color="text-minor">
                {'Статус поставщика'}
            </Typography>
            <br />
            <Typography variant="s" size="body_short">
                {'Дистрибьютор'}
            </Typography>
        </div>
    </Grid>
);

export default ProductDetailsProvider;
