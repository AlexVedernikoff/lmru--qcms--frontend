import {Checkbox, Grid, Typography} from 'fronton-react';
import styles from '../ProductsDetails.module.css';

const ProductsDetailsProduct: React.FC = () => (
    <Grid className={styles.sectionItem} rowGap={24} columnGap={24}>
        <Typography variant="h3">{'Продукт'}</Typography>

        <Grid rowGap={4} columns="1fr 3fr repeat(2, 1fr)">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {'Код товара'}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'87334230'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {'EAN'}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'4607141437762'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {'Код ТН ВЭД'}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'3209100009'}
                </Typography>
            </div>
        </Grid>

        <Grid rowGap={4} columns="1fr 3fr repeat(2, 1fr)">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {'Риск'}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Не очень важный'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {'Модель качества'}
                </Typography>
                <br />
                {/* <LinkButton> */}
                <Typography variant="s" size="body_short">
                    {'Decorative plaster in paste form'}
                </Typography>
                {/* </LinkButton> */}
            </div>
        </Grid>

        <div>
            <Typography variant="s" size="body_long" color="text-minor">
                {'Товарная модель'}
            </Typography>
            <br />
            <Typography variant="s" size="body_short">
                {
                    '11_Краски / Фасадная краска Штукатурка и широкая облицовка фасада / Декоративная штукатурка для наружных работ'
                }
            </Typography>
        </div>

        <div>
            <Checkbox checked={false} label={'Относится к категории химии'} />
        </div>

        <div>
            <Grid rowGap={4} columns="repeat(6, 1fr)">
                <Checkbox checked={false} label={'СТМ'} />
                <Checkbox checked={false} label={'Международный импорт'} />
                <Checkbox checked={false} label={'Из проекта'} />
            </Grid>
        </div>
    </Grid>
);

export default ProductsDetailsProduct;
