import {useState} from 'react';
import {Radio} from 'fronton-react';
import {EUserRole} from 'common/roles';
import {useAppDispatch, useAppSelector} from 'store';
import {userStoreActions} from 'store/slices/authSlice';

import s from './styles.module.css';

const SwitchUserRoles = () => {
    const dispatch = useAppDispatch();
    const currentRoles = useAppSelector(store => store.userStore.userData!.roles);
    const [isOpened, setOpened] = useState<boolean>(false);

    const roles = Object.values(EUserRole);

    const clickRole = (clickedRole: EUserRole) => {
        dispatch(userStoreActions.clickRole(clickedRole));
    };

    const handleButtonClick = () => setOpened(prevState => !prevState);

    if (isOpened) {
        return (
            <div className={s.root}>
                {roles.map(role => (
                    <Radio
                        key={role}
                        label={role}
                        checked={currentRoles.includes(role)}
                        onClick={() => clickRole(role)}
                    />
                ))}
                <button onClick={handleButtonClick} className={s.button}>
                    Закрыть
                </button>
            </div>
        );
    }

    return (
        <div className={s.root}>
            <button onClick={handleButtonClick} className={s.button}>
                Выбрать роль
            </button>
        </div>
    );
};

export default SwitchUserRoles;
