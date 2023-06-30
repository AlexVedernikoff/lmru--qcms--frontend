import {Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {IProduct} from '../../../../common/types/products';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

const ProductsAddCommentModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const {t} = useTranslation('products');

    return (
        <Modal onClose={onClose} show={show}>
            <ModalHeader title={t('WithModels.Actions.actions.addComment')} />
            <ModalContent></ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    );
};

export default ProductsAddCommentModalWindow;
