import {Grid, Modal, ModalContent, ModalHeader, RegularButton, ModalFooter} from 'fronton-react';
import {useTranslation} from 'react-i18next';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    handleConfirmDeletion: () => void;
}

const style = {width: '50%'};

const MasterPlanRemoveTaskModal: React.FC<IProps> = ({isOpen, onClose, handleConfirmDeletion}) => {
    const {t} = useTranslation('models');
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="s">
            <ModalHeader title={t('Buttons.Delete')} />
            <ModalContent></ModalContent>
            <ModalFooter className="css-1fi9pik">
                <RegularButton onClick={handleClose} size="l" variant="secondary" style={style}>
                    Отмена
                </RegularButton>
                <RegularButton onClick={handleConfirmDeletion} size="l" variant="primary" style={style}>
                    Подтвердить
                </RegularButton>
            </ModalFooter>
        </Modal>
    );
};

export default MasterPlanRemoveTaskModal;
