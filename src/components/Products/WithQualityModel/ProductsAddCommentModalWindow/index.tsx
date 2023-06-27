import {Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';
import {IWithModelItem} from '../../../../common/types/withModel';
import {useTranslation} from 'react-i18next';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IWithModelItem[];
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
