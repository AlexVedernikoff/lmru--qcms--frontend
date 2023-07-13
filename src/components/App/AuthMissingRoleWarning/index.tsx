import SwitchUserRoles from 'components/Common/SwitchUserRoles';

import s from './styles.module.css';

const AuthMissingRoleWarning = () => {
    return (
        <div className={s.root}>
            {process.env.NODE_ENV === 'development' && <SwitchUserRoles />}
            <h2>К сожалению, у вас нет роли</h2>
        </div>
    );
};

export default AuthMissingRoleWarning;
