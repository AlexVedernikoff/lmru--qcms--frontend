import {WarningCircleIcon} from '@fronton/icons-react';
import {Loader, Typography} from 'fronton-react';
import styles from './styles.module.css';

interface IProps {
    title: string;
    count: number;
    image?: React.ReactElement;
    isPrimary?: boolean;
    icon?: React.ReactElement;
    isLoading?: boolean;
    isError?: boolean;
}

const TaskCard: React.FC<IProps> = ({title, count, image, isPrimary, icon, isLoading, isError}) => (
    <div className={isPrimary ? styles.primaryCard : styles.defaultCard}>
        <div className={styles.allTasks}>{icon}</div>
        {isLoading ? (
            <Loader variant={isPrimary ? 'invert' : 'primary'} size="l" className={styles.cardTaskLoader} />
        ) : (
            <Typography className={styles.cardTaskTitle} variant="h3">
                {title}
            </Typography>
        )}
        {isError && (
            <div className={styles.cardTaskErrorBlock}>
                <WarningCircleIcon size="xl" type="outline" color="attention-primary" />
                <Typography variant="s" size="body_short" className={styles.cardTaskErrorText}>
                    Не удалось загрузить
                </Typography>
            </div>
        )}
        <Typography className={styles.cardTaskCount} variant="l" size="body_long">
            {isError || isLoading ? ' ' : count}
        </Typography>
        {!!image ? <div className={styles.cardImage}>{image}</div> : <div className={styles.cardImageEmptyBlock} />}
    </div>
);

export default TaskCard;
