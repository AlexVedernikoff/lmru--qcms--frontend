import {useState} from 'react';
import {CheckCircleIcon, ChevronDownIcon, ChevronRightIcon} from '@fronton/icons-react';
import styles from './AccordionPanel.module.css';

interface IProps {
    header: string | undefined;
    numberIcon?: number | undefined;
    disableStatusIcon?: boolean;
}

type TProps = React.PropsWithChildren<IProps>;

const AccordionPanel: React.FC<TProps> = ({header, numberIcon, disableStatusIcon, children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenClick = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header} onClick={handleOpenClick}>
                <div className={styles.headerInfo}>
                    {numberIcon && <div className={styles.circle}>{numberIcon}</div>}
                    <div>{header}</div>
                    {!disableStatusIcon && <CheckCircleIcon type="outline" size="l" color="text-primary" />}
                </div>
                {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </div>
            {isOpen && <div className={styles.body}>{children}</div>}
        </div>
    );
};

export default AccordionPanel;
