import {Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import MasterPlanTable from './MasterPlanTable';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const MasterPlanAddModal: React.FC<IProps> = ({isOpen, onClose}) => {
    const {t} = useTranslation('models');

    // const [tableData, setTableData] = useState([]);

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {};

    return (
        <Modal show={isOpen} onClose={handleClose} size="l">
            <ModalHeader title={t('Buttons.Add')} />
            <ModalContent>
                <MasterPlanTable data={[]} />
            </ModalContent>
            <ModalFooter>
                <RegularButton onClick={handleSave}>{t('Buttons.Save')}</RegularButton>
            </ModalFooter>
        </Modal>
    );
};

export default MasterPlanAddModal;
