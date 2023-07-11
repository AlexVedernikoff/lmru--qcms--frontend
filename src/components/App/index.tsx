import {useAppSelector} from 'store';
import AuthError from './AuthError';
import AuthInProgress from './AuthInProgress';
import {AuthStatus} from 'common/types/user';
import AuthSuccess from './AuthSuccess';

const App = () => {
    const userStore = useAppSelector(state => state.userStore);

    if (userStore.authStatus === AuthStatus.AuthSuccess) {
        return <AuthSuccess />;
    }

    if (userStore.authStatus === AuthStatus.AuthError) {
        return <AuthError />;
    }

    return <AuthInProgress />;
};

export default App;
