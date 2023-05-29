import {Typography} from 'fronton-react';
import styles from './styles.module.css';

interface IProps {
    title: string;
    count: number;
    image?: React.ReactElement;
    isPrimary?: boolean;
    icon?: React.ReactElement;
}

const TaskCard: React.FC<IProps> = ({title, count, image, isPrimary, icon}) => (
    <div className={isPrimary ? styles.primaryCard : styles.defaultCard}>
        <div className={styles.allTasks}>{icon}</div>
        <Typography className={styles.cardTaskTitle} variant="h3">
            {title}
        </Typography>
        <Typography className={styles.cardTaskCount} variant="l" size="body_long">
            {count}
        </Typography>
        {!!image && <div className={styles.cardImage}>{image}</div>}
    </div>
);

export default TaskCard;
