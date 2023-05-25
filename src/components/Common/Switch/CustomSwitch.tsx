import styles from './styles.module.css';

interface IProps {
    name: string;
    handleChange: () => void;
    checked: boolean;
}

type TProps = React.PropsWithChildren<IProps>;

export const CustomSwitch: React.FC<TProps> = ({name, handleChange, checked}) => (
    <label htmlFor="switch" className={styles.switch}>
        <input type="checkbox" onChange={handleChange} checked={checked} role="switch" id="switch" />
        {name}
    </label>
);
