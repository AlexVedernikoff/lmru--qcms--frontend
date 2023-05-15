import styles from './styles.module.css';

type SwitchProps = {
  name: string;
  handleChange: () => void;
  checked: boolean;
}

export const CustomSwitch = (props: SwitchProps) => {
  const { name, handleChange, checked } = props;

  return (
    <label htmlFor="switch" className={styles.switch}>
      <input type="checkbox" onChange={handleChange} checked={checked} role="switch" id="switch" />
        {name}
    </label>)
}
