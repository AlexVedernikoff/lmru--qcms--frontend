import {useState, useEffect, FC} from 'react';
import {Grid, Typography} from 'fronton-react';
import styles from './styles.module.css';

interface IProps {
    name: string;
    value: boolean | undefined;
    onChange: (value: boolean | undefined, name: string) => void;
    label?: string;
}

const CustomCheckbox: FC<IProps> = ({name, value, onChange, label}) => {
    const [flagYes, setFlagYes] = useState(false);
    const [flagNo, setFlagNo] = useState(false);

    const clearValues = () => {
        setFlagYes(false);
        setFlagNo(false);
    };

    useEffect(() => {
        if (value === undefined) {
            clearValues();
        } else {
            setFlagYes(value);
            setFlagNo(!value);
        }
    }, [value]);

    const handleYesChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        if (e.target.checked) {
            setFlagYes(true);
            onChange(true, name);
        } else {
            setFlagYes(false);
            onChange(undefined, name);
        }
    };

    const handleNoChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        if (e.target.checked) {
            setFlagNo(true);
            onChange(false, name);
        } else {
            setFlagNo(false);
            onChange(undefined, name);
        }
    };

    return (
        <>
            <Grid columnGap={8} columns="repeat(2, 1fr)" alignItems="center" alignContent="baseline">
                <label className={styles.label}>
                    <input
                        className={styles.input}
                        type="checkbox"
                        name="yes"
                        onChange={handleYesChange}
                        checked={flagYes}
                    />
                    Да
                </label>
                <label className={styles.label}>
                    <input
                        className={styles.input}
                        type="checkbox"
                        name="no"
                        onChange={handleNoChange}
                        checked={flagNo}
                    />
                    Нет
                </label>
            </Grid>

            {!!label && (
                <Typography variant="s" size="body_short">
                    {label}
                </Typography>
            )}
        </>
    );
};

export default CustomCheckbox;
