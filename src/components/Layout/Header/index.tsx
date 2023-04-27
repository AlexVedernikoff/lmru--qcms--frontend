import {Avatar, BaseButton} from 'fronton-react';
import {BellIcon, SignOutIcon, QuestionIcon} from '@fronton/icons-react';
import {useNavigate} from 'react-router-dom';
import {APP_ROUTES} from '../../../common/consts';
import Logo from '../Logo';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(APP_ROUTES.dashboard);
    };

    return (
        <header className={styles.header}>
            <BaseButton onClick={handleLogoClick}>
                <Logo />
            </BaseButton>

            <div className={styles.items}>
                <BaseButton>
                    <QuestionIcon type="outline" size="l" color="text-minor" />
                </BaseButton>

                <BaseButton>
                    <BellIcon type="outline" size="l" color="text-minor" />
                </BaseButton>

                <div className={styles.row}>
                    <Avatar
                        color="green"
                        description="Сотрудник Леруа Мерлен Восток"
                        hideInfo
                        name={'test test'}
                        overflow="multiline"
                        size="s"
                        variant="fill"
                    />

                    <div className={styles.column}>
                        <div className={styles.columnItemPrimary}>{'60131149'}</div>
                        <div className={styles.columnItem}>{'ui/ux designer'}</div>
                    </div>
                </div>

                <BaseButton onClick={() => {}}>
                    <SignOutIcon type="fill" size="l" color="text-minor" />
                </BaseButton>
            </div>
        </header>
    );
};

export default Header;
