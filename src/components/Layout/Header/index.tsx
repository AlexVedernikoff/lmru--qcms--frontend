import {Avatar, BaseButton} from 'fronton-react';
import {BellIcon, SignOutIcon, QuestionIcon} from '@fronton/icons-react';
import {useNavigate} from 'react-router-dom';
import {APP_ROUTES} from '../../../common/consts';
import Logo from '../Logo';
import styles from './Header.module.css';
import TranslationSelect from './TranslationSelect';

const user = {
    name: 'Ivan Ivanov',
    department: 'Сотрудник Леруа Мерлен Восток',
    ldap: '60000000',
    role: 'admin',
};

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(APP_ROUTES.dashboard);
    };

    const handleSignOut = () => {};

    return (
        <header className={styles.header}>
            <BaseButton onClick={handleLogoClick}>
                <Logo />
            </BaseButton>

            <div className={styles.items}>
                <TranslationSelect />

                {false && (
                    <BaseButton>
                        <QuestionIcon type="outline" size="l" color="text-minor" />
                    </BaseButton>
                )}

                {false && (
                    <BaseButton>
                        <BellIcon type="outline" size="l" color="text-minor" />
                    </BaseButton>
                )}
                <div className={styles.row}>
                    <Avatar
                        name={user.name}
                        description={user.department}
                        color="green"
                        overflow="multiline"
                        variant="fill"
                        size="s"
                        hideInfo
                    />

                    <div className={styles.column}>
                        <div className={styles.columnItemPrimary}>{user.ldap}</div>
                        <div className={styles.columnItem}>{user.role}</div>
                    </div>
                </div>
                <BaseButton onClick={handleSignOut}>
                    <SignOutIcon type="fill" size="l" color="text-minor" />
                </BaseButton>
            </div>
        </header>
    );
};

export default Header;
