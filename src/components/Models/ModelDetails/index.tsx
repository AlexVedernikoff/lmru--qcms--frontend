import {useParams} from 'react-router-dom';
import {Grid, Typography} from 'fronton-react';
import styles from '../../Common.module.css';
import ModelDetailsMainData from './ModelDetailsMainData';
import ModelDetailsQualityManager from './ModelDetailsQualityManager';

const ModelDetails: React.FC = () => {
    const {id} = useParams();

    const title = `Колоранты для колеровочных машин - ${id}`;

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>

            <Grid className={styles.panel} rowGap={16} columnGap={16}>
                <Grid rowGap={16} columnGap={16} columns="570px 1fr">
                    <ModelDetailsMainData />
                    <ModelDetailsQualityManager />
                </Grid>

                <Grid rowGap={16} columnGap={16} columns="500px 1fr"></Grid>
            </Grid>
        </Grid>
    );
};

export default ModelDetails;
