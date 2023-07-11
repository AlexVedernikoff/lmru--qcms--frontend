import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Dropdown,
    DropdownItem,
    Grid,
    Input,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    RegularButton,
} from 'fronton-react';
import {useAppSelector} from 'store';
import styles from './styles.module.css';

interface IProps {
    isOpen: boolean;
    onConfirm: (selectedInfo: string) => void;
    onClose: () => void;
}

const AuthUserInfoModal: React.FC<IProps> = ({isOpen, onClose, onConfirm}) => {
    const {t} = useTranslation('auth');

    const supplier = useAppSelector(state => state.userStore.userData?.userName);
    const supplierCommercialIds = useAppSelector(
        state => state.userStore.userData?.supplierCommercialIds?.split(',') || []
    );

    const [selectedInfo, setSelectedInfo] = useState<string | undefined>();

    const handleSelect = (value: string | null) => {
        // const newValue = value ? parseInt(value, 10) : undefined;
        setSelectedInfo(value || undefined);
    };

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        if (selectedInfo) {
            onConfirm(selectedInfo);
        }
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="s">
            <ModalHeader className={styles.header} title={t('Title')} />

            <ModalContent>
                <div className={styles.body}>
                    <Input inputSize="m" label={t('Field.Supplier')} value={supplier} disabled />

                    <Dropdown
                        label={t('Field.AdditionalInfo')}
                        size="m"
                        closeOnSelect
                        value={selectedInfo}
                        onSelect={handleSelect}
                    >
                        {supplierCommercialIds.map((d, index) => (
                            <DropdownItem key={index} text={d} value={d} />
                        ))}
                    </Dropdown>
                </div>
            </ModalContent>

            <ModalFooter>
                <Grid columns="1fr" gap={24}>
                    <RegularButton onClick={handleSave}>{t('Action.Ok')}</RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default AuthUserInfoModal;
