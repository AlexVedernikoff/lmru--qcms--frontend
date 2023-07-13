import {Avatar, BaseButton} from 'fronton-react';
import {BellIcon, SignOutIcon, QuestionIcon} from '@fronton/icons-react';
import {useNavigate} from 'react-router-dom';
import Logo from '../Logo';
import styles from './Header.module.css';
import TranslationSelect from './TranslationSelect';
import {RoutePath} from 'common/routes';
import {useAppSelector} from 'store';

const Header: React.FC = () => {
    const userData = useAppSelector(store => store.userStore.userData!);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(RoutePath.Dashboard);
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
                        name={userData.userName}
                        color="green"
                        overflow="multiline"
                        variant="fill"
                        size="s"
                        hideInfo
                    />

                    <div className={styles.column}>
                        <div className={styles.columnItemPrimary}>{userData.userName}</div>
                        <div className={styles.columnItem}>{userData.roles[0]}</div>
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
