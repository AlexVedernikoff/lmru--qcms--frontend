import {Checkbox, Grid, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import commonStyles from '../../Common.module.css';
import styles from './styles.module.css';
import TransferFilter from './TransferFilter';
import TransferItem from './TransferItem';

const Transfer: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid rowGap={16}>
            <Typography variant="h3">{t('Transfer.Title')}</Typography>

            <TransferFilter />

            <div className={styles.infoRow}>
                <Typography variant="m" size="body_long">
                    {t('Transfer.Info.Title')}
                </Typography>

                <div>
                    <Typography variant="m" size="body_long">
                        {t('Transfer.Info.WithActiveProvider')}
                    </Typography>{' '}
                    <Typography variant="m" size="body_accent">
                        {t('Common.Yes')}
                    </Typography>
                    {', '}
                    <Typography variant="m" size="body_long">
                        {t('Transfer.Info.WithoutTransfer')}
                    </Typography>{' '}
                    <Typography variant="m" size="body_accent">
                        {t('Common.Yes')}
                    </Typography>
                    {', '}
                    <Typography variant="m" size="body_long">
                        {t('Transfer.Info.QE')}
                    </Typography>{' '}
                    <Typography variant="m" size="body_accent">
                        {t('Transfer.Info.QEData')}
                    </Typography>
                </div>
            </div>

            <Grid rowGap={16} className={commonStyles.panel}>
                <Grid columns="repeat(6, 1fr)" columnGap={12}>
                    <Checkbox checked={false} label={t('Buttons.SelectAll')} />
                    <RegularButton size="m" onClick={() => {}}>
                        {t('Buttons.SelectDocumentsWithoutTransfer')}
                    </RegularButton>
                </Grid>

                {['test'].map((d, i) => (
                    <TransferItem key={i} />
                ))}
            </Grid>
        </Grid>
    );
};

export default Transfer;
