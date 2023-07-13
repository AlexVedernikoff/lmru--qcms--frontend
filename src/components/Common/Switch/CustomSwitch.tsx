import {Typography} from 'fronton-react';
import styles from './styles.module.css';

interface IProps {
    name: string;
    checked: boolean;
    disabled?: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

type TProps = React.PropsWithChildren<IProps>;

export const CustomSwitch: React.FC<TProps> = ({name, handleChange, checked, disabled = false}) => (
    <label htmlFor="switch" className={styles.wrapper}>
        <input
            type="checkbox"
            onChange={handleChange}
            checked={checked}
            role="switch"
            id="switch"
            className={styles.switch}
            disabled={disabled}
        />
        {!!name && (
            <Typography variant="s" size="body_short">
                {name}
            </Typography>
        )}
    </label>
);
