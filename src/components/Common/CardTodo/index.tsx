import styles from './styles.module.css';
import AddTodoIcon from '../../Icons/AddTodoIcon';
import {useTranslation} from 'react-i18next';
import FlagIcon from '../../Icons/FlagIcon';

export const CardTodo = () => {
    const {t} = useTranslation('cardTodo');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.addIcon}>
                    <AddTodoIcon />
                </div>
                <div className={styles.title}>{t('Title')}</div>
            </div>
            <div>
                <ul className={styles.list}>
                    <li>
                        <div>{t('List.ReChecking')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>2</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.QualifyingTasksLaunch')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>1</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.TransferDocuments')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>9</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.ProductsWithErrors')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>1</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.ProductsWithoutQualityModels')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>2</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.CertificationTasksLaunch')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>2</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.AdditionalQualificationProducts')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>2</div>
                            <div>4</div>
                        </div>
                    </li>
                    <li>
                        <div>{t('List.TasksAwaitingValidation')}</div>
                        <div className={styles.containerValues}>
                            <div>
                                <FlagIcon />
                            </div>
                            <div className={styles.importantValue}>2</div>
                            <div>4</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
