import {useAppDispatch} from 'store';
import {userStoreActions} from 'store/slices/authSlice';

const AuthError = () => {
    const dispatch = useAppDispatch();
    const handleClick = () => dispatch(userStoreActions.setAuthNeedToRefreshTokensState());

    return (
        <div>
            К сожалению, при авторизации произошла ошибка.
            <button onClick={handleClick}>Повторить попытку</button>
        </div>
    );
};

export default AuthError;
