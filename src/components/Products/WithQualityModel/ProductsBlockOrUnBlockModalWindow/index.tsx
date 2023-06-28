import {useTranslation} from 'react-i18next';
import {Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';
import {IProduct} from '../../../../common/types/products';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
}

const ProductsBlockOrUnBlockModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const {t} = useTranslation('products');

    return (
        <Modal onClose={onClose} show={show}>
            <ModalHeader title={t('WithModels.Actions.actions.blockOrUnBlock')} />
            <ModalContent></ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    );
};

export default ProductsBlockOrUnBlockModalWindow;
