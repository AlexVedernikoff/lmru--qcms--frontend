import {Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';

const MasterPlanAddModal: React.FC = () => {
    const handleClose = () => {};

    return (
        <Modal show onClose={handleClose}>
            <ModalHeader></ModalHeader>
            <ModalContent></ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    );
};

export default MasterPlanAddModal;
