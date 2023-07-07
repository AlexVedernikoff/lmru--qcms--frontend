import {Modal, ModalContent, ModalHeader, RegularButton, ModalFooter} from 'fronton-react';
import {useTranslation} from 'react-i18next';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const style = {paddingLeft: '40px'};

const MasterPlanRemErrorTaskModal: React.FC<IProps> = ({isOpen, onClose}) => {
    const {t} = useTranslation('models');
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="s">
            <ModalHeader title={`${t('Buttons.Error')}!`} />
            <ModalContent style={style}>Во время выполнения запроса произошла ошибка.</ModalContent>
            <ModalFooter>
                <RegularButton onClick={handleClose} size="l" variant="primary">
                    Принять
                </RegularButton>
            </ModalFooter>
        </Modal>
    );
};

export default MasterPlanRemErrorTaskModal;
