import {Grid, Modal, ModalContent, ModalHeader, RegularButton} from 'fronton-react';
import CustomTable from '../../../Common/CustomTable';
import {prepareHistoryColumns} from '../ProductDetailsMapping/ProductDetailsQaulityStatusSection/prepareHistoryColumns';
import {History} from '../../../../common/types/productDetails';

import styles from './productDetailsQstatuses.module.css';

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
            <ModalContent>
                <ModalHeader className={styles.modalHeader} title="История" />

                <CustomTable
                    className={styles.table}
                    columns={prepareHistoryColumns(rowHistory)}
                    dataSource={rowHistory}
                    pagination={false}
                    size="small"
                    scroll={{y: 400}}
                />
            </ModalContent>

            <Grid className={styles.modalFooter} columnGap={16} columns="repeat(2, 80% 20%)">
                <div></div>
                <RegularButton onClick={handleClose} size="l" variant="primary">
                    {'ок'}
                </RegularButton>
            </Grid>
        </Modal>
    );
};

export default HistoryTabModal;
