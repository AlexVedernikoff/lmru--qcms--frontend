import {IProduct} from '../../../../common/types/products';
import {ProductsActions} from '../ProductsActionsForm';
import ProductsAddCommentModalWindow from '../ProductsAddCommentModalWindow';
import ProductsAddDocumentModalWindow from '../ProductsAddDocumentModalWindow';
import ProductsAddTasksModalWindow from '../ProductsAddTasksModalWindow';
import ProductsBlockOrUnBlockModalWindow from '../ProductsBlockOrUnBlockModalWindow';

interface Props {
    onClose: () => void;
    products: IProduct[];
    action: ProductsActions | null;
}

const ModalWindowsGroup: React.FC<Props> = ({onClose, products, action}) => {
    return (
        <>
            <ProductsAddCommentModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.AddComment}
                onSubmit={onClose}
            />
            <ProductsAddDocumentModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.AddDocument}
                onSubmit={onClose}
            />
            <ProductsAddTasksModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.AddTasks}
                onSubmit={onClose}
            />
            <ProductsBlockOrUnBlockModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.BlockOrUnBlock}
                onSubmit={onClose}
            />
        </>
    );
};

export default ModalWindowsGroup;
