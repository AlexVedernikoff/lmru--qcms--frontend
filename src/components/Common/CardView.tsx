import {IconButton, Tooltip, Typography} from 'fronton-react';
import {InfoIcon, XIcon} from '@fronton/icons-react';
import styles from './CardView.module.css';

interface IProps {
    header: string | undefined;
    infoLink?: string;
    onClose?: () => void;
}

type TProps = React.PropsWithChildren<IProps>;

const CardView: React.FC<TProps> = ({header, children, infoLink, onClose}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    {!!infoLink && (
                        <Tooltip title={infoLink}>
                            <IconButton href={infoLink} rel={''} aria-label={''}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Typography variant="m" size="body_accent">
                        {header}
                    </Typography>
                </div>

                {!!onClose && (
                    <IconButton href={'#'} rel={''} aria-label={''}>
                        <XIcon />
                    </IconButton>
                )}
            </div>
            <div className={styles.body}>{children}</div>
        </div>
    );
};

export default CardView;
