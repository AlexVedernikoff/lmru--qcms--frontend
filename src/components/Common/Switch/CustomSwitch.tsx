import {Typography} from 'fronton-react';
import styles from './styles.module.css';

interface IProps {
    name: string;
    checked: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

type TProps = React.PropsWithChildren<IProps>;

export const CustomSwitch: React.FC<TProps> = ({name, handleChange, checked}) => (
    <label htmlFor="switch" className={styles.wrapper}>
        <input
            type="checkbox"
            onChange={handleChange}
            checked={checked}
            role="switch"
            id="switch"
            className={styles.switch}
        />
        {!!name && (
            <Typography variant="s" size="body_short">
                {name}
            </Typography>
        )}
    </label>
);
