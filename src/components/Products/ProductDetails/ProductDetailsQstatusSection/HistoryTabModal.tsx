import {Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';
import CustomTable from '../../../Common/CustomTable';
import {prepareHistoryColumns} from '../ProductDetailsMapping/ProductDetailsQaulityStatusSection/prepareHistoryColumns';
import {History} from '../../../../common/types/productDetails';

interface IProps {
    isOpen: boolean;
    rowHistory: History[];
    onClose: () => void;
}

const HistoryTabModal: React.FC<IProps> = ({isOpen, onClose, rowHistory}) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="l">
            <ModalHeader />
            <ModalContent>
                <CustomTable
                    columns={prepareHistoryColumns(rowHistory)}
                    dataSource={rowHistory}
                    pagination={false}
                    size="small"
                    scroll={{y: 400}}
                />
            </ModalContent>
            <br />
            <ModalFooter />
        </Modal>
    );
};

export default HistoryTabModal;
