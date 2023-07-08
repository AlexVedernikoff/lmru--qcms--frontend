import {Grid, Modal, ModalContent, ModalHeader, RegularButton, ModalFooter} from 'fronton-react';
import {useTranslation} from 'react-i18next';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (masterPlanId: number) => void;
    masterPlanId: number;
}

const MasterPlanRemoveTaskModal: React.FC<IProps> = ({isOpen, onClose, onConfirm, masterPlanId}) => {
    const {t} = useTranslation('models');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        onConfirm(masterPlanId);
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="s">
            <ModalHeader title={`${t('Buttons.Delete')}?`} />
            <ModalContent></ModalContent>
            <ModalFooter>
                <Grid columns="1fr 1fr" gap={24}>
                    <RegularButton onClick={handleClose} size="l" variant="secondary">
                        Отмена
                    </RegularButton>
                    <RegularButton onClick={handleConfirm} size="l" variant="primary">
                        Подтвердить
                    </RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default MasterPlanRemoveTaskModal;
