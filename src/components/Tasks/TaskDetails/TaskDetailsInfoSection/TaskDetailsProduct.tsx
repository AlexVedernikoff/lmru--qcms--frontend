import {Grid, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import classes from './styles.module.css';
import {PropsTaskDetails} from '../TaskDetails';

const TaskDetailsProduct: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    const {taskDetails} = props;

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.Product')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {`${taskDetails.product.code} - ${taskDetails.product.code}`}
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
                    {
                        // может просто code?
                    }
                    {taskDetails.product.adeoProductCode}
                </Typography>
            </div>

            <br />

            {taskDetails?.documents?.uploadedDocuments[0]?.productInfoDetails && (
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('TaskDetails.DetailsProduct.EAN')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {taskDetails?.documents?.uploadedDocuments[0]?.productInfoDetails[0].ean}
                    </Typography>
                </div>
            )}

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.QualityModel')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetails.product.qualityModel}
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
                    {taskDetails.product.qualityStatus}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProduct.ADEORisk')}
                </Typography>
                <br />
                <Typography className={classes.important} variant="s" size="body_short">
                    {taskDetails.product.adeoRisk}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsProduct;
