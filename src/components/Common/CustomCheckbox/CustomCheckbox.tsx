import {useState, useEffect, FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Checkbox} from 'fronton-react';
import styles from './styles.module.css';

interface IProps {
    name: string;
    value: boolean | undefined;
    onChange: (value: boolean | undefined, name: string) => void;
    label?: string;
}

const CustomCheckbox: FC<IProps> = ({name, value, onChange, label}) => {
    const {t} = useTranslation('checkbox');

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

    const handleYesChange = (next: boolean) => {
        if (next) {
            setFlagYes(true);
            onChange(true, name);
        } else {
            setFlagYes(false);
            onChange(undefined, name);
        }
    };

    const handleNoChange = (next: boolean) => {
        if (next) {
            setFlagNo(true);
            onChange(false, name);
        } else {
            setFlagNo(false);
            onChange(undefined, name);
        }
    };

    return (
        <div className={styles.wrapper}>
            <Checkbox onChange={handleYesChange} checked={flagYes} label={t('yes')} name="yes" />
            <Checkbox onChange={handleNoChange} checked={flagNo} label={t('no')} name="no" />
            {!!label && <div className={styles.label}>{label}</div>}
        </div>
    );
};

export default CustomCheckbox;
