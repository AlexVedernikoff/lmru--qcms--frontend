import {Grid, Label, RegularButton, Typography} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
import commonStyles from '../../Common.module.css';
import styles from './styles.module.css';
import TransferTable from './TransferTable';

interface IProps {}

const TransferItem: React.FC<IProps> = () => {
    const {t} = useTranslation('products');

    return (
        <Grid rowGap={24} className={commonStyles.sectionItem}>
            <Grid columns="450px 1fr" columnGap={12} alignItems="center">
                <Typography variant="l" size="body_long">
                    {'ГРУНТ-ЭМАЛЬ СПЕЦНАЗ СЕРАЯ, 3 КГ 84557514'}
                </Typography>

                <RegularButton
                    data-id={'test-id'}
                    onClick={() => {}}
                    href=""
                    rel=""
                    aria-label=""
                    variant="pseudo"
                    iconOnly
                >
                    <MagnifyingGlassIcon />
                </RegularButton>
            </Grid>

            <Grid columns="1fr 0.25fr" columnGap={12}>
                <div className={styles.headerGrid}>
                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('Transfer.Table.Header.providerName')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {'1003735011 - ООО "ПРО ВОСТОК"'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('Transfer.Table.Header.EAN')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {'4607128574503'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('Transfer.Table.Header.creationDate')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {'29/09/2022'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('Transfer.Table.Header.storeCode')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {'84557514'}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('Transfer.Table.Header.providerStatus')}
                        </Typography>
                        <br />
                        <Label background="success-primary" color="text-invert">
                            {'Дистрибьютор'}
                        </Label>
                    </div>

                    <RegularButton size="m" onClick={() => {}}>
                        {t('Buttons.SelectDocumentsWithoutTransfer')}
                    </RegularButton>
                </div>

                <span />
            </Grid>

            <TransferTable />
        </Grid>
    );
};

export default TransferItem;
