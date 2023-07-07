import {Loader} from 'fronton-react';
import styles from './styles.module.css';

const LoadingOverlay: React.FC = () => (
    <div className={styles.overlay}>
        <Loader />
    </div>
);

export default LoadingOverlay;
