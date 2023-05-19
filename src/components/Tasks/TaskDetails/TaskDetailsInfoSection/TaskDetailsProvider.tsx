import {Grid, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import { MagnifyingGlassIcon } from '@fronton/icons-react';

const TaskDetailsProvider: React.FC = () => {
    const {t} = useTranslation('tasks');

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProvider.Provider')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'1004128001 - ООО "ХимТоргПроект"'}
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
                    {t('TaskDetails.DetailsProvider.ProviderStatus')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Дистрибьютор'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsProvider.TargetBU')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Леруа Мерлен Россия'}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsProvider;
