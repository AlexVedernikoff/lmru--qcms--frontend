import {useState, useEffect, FC, useCallback} from 'react';
import styles from './styles.module.css';
import {IFilterFormState} from '../../Products/WithQualityModel/ProductsFilter';

type Props = {
    field: string;
    formState: IFilterFormState;
    setFormState: (state: IFilterFormState) => void;
};

type IStateCheckbox = {
    [field: string]: boolean | undefined;
};

const CustomCheckbox: FC<Props> = ({field, setFormState, formState}) => {
    const [stateCheckbox, setStateCheckbox] = useState<IStateCheckbox>({
        [field]: undefined,
    });

    const [checkboxesState, setCheckboxesState] = useState<{
        yes?: boolean;
        no?: boolean;
    }>({
        yes: undefined,
        no: undefined,
    });

    type checkboxNames = keyof typeof checkboxesState;
    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;

        if (!checked) {
            setCheckboxesState(prev => ({
                ...prev,
                [name]: undefined,
            }));
        } else {
            setCheckboxesState(prev => ({
                ...prev,
                [name]: checked,
            }));
        }

        if (checked) {
            const anotherCheckboxName = (Object.keys(checkboxesState) as Array<checkboxNames>).find(n => n !== name)!;

            setCheckboxesState(prev => ({
                ...prev,
                [anotherCheckboxName]: undefined,
            }));
        }
    };

    useEffect(() => {
        const checkbox = (Object.keys(checkboxesState) as Array<checkboxNames>).find(key => checkboxesState[key]);
        switch (checkbox) {
            case 'no':
                setStateCheckbox({[field]: false});
                return;
            case 'yes':
                setStateCheckbox({[field]: true});
                return;
            default:
                setStateCheckbox({[field]: undefined});
        }
    }, [checkboxesState, field]);

    const data = useCallback(
        (mddState: IStateCheckbox) => {
            setFormState({...formState, [field]: mddState[field]});
        },
        [field, formState, setFormState]
    );

    useEffect(() => {
        console.log(stateCheckbox);
        data(stateCheckbox);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateCheckbox]);

    return (
        <>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    type="checkbox"
                    name="yes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCheckbox(e)}
                    checked={!!checkboxesState.yes}
                />
                Да
            </label>
            <label className={styles.label}>
                <input
                    className={styles.input}
                    type="checkbox"
                    name="no"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCheckbox(e)}
                    checked={!!checkboxesState.no}
                />
                Нет
            </label>
        </>
    );
};

export default CustomCheckbox;
