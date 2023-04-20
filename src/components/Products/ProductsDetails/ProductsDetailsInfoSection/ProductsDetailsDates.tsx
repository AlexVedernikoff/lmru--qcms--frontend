import {Checkbox, Grid, Typography} from 'fronton-react';
import styles from '../ProductsDetails.module.css';

const ProductsDetailsDates: React.FC = () => (
    <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
        <Typography variant="h3">{'Даты'}</Typography>

        <Grid rowGap={4} columns="1fr 1fr">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {'Дата создания'}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'13/03/2023'}
                </Typography>
            </div>

            <div>
                <Checkbox checked={false} label={'AVS'} />
            </div>
        </Grid>
    </Grid>
);

export default ProductsDetailsDates;
