import {useTranslation} from 'react-i18next';
import {IWithModelItem} from '../../../../common/types/withModel';
import {Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IWithModelItem[];
}

const ProductsAddDocumentModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const {t} = useTranslation('products');

    return (
        <Modal onClose={onClose} show={show}>
            <ModalHeader title={t('WithModels.Actions.actions.addDocument')} />
            <ModalContent></ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    );
};

export default ProductsAddDocumentModalWindow;
