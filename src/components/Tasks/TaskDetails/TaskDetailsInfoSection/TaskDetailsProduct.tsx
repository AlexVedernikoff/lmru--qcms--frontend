import {Grid, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import { MagnifyingGlassIcon } from '@fronton/icons-react';
import classes from './styles.module.css';

const TaskDetailsProduct: React.FC = () => {
    const {t} = useTranslation('tasks');

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.Product')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'87312445 - МАСТИКА БИТУМ. ДЛЯ КРОВЕЛЬ 21,5 Л/18 КГ'}
                    <RegularButton
                        onClick={() => {}}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                        style={{verticalAlign: 'middle'}}
                    >
                        <MagnifyingGlassIcon />
                    </RegularButton>
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.ProductCodeAdeo')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'87312445'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.EAN')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'4607952904828'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.QualityModel')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Гидроизоляция'}
                    <RegularButton
                        onClick={() => {}}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                        style={{verticalAlign: 'middle'}}
                    >
                        <MagnifyingGlassIcon />
                    </RegularButton>
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.QualityStatus')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Предполагаемое соответствие'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.ADEORisk')}
                </Typography>
                <br />
                <Typography className={classes.important} variant="s" size="body_short">
                    {'Очень важный'}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsProduct;
