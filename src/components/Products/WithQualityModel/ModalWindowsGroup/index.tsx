import {ProductsActions} from '../ProductsActionsForm';
import {IWithModelItem} from '../../../../common/types/withModel';
import ProductsAddCommentModalWindow from '../ProductsAddCommentModalWindow';
import ProductsAddDocumentModalWindow from '../ProductsAddDocumentModalWindow';
import ProductsAddTasksModalWindow from '../ProductsAddTasksModalWindow';
import ProductsBlockOrUnBlockModalWindow from '../ProductsBlockOrUnBlockModalWindow';

interface Props {
    onClose: () => void;
    products: IWithModelItem[];
    action: ProductsActions | null;
}

const ModalWindowsGroup: React.FC<Props> = ({onClose, products, action}) => {
    return (
        <>
            <ProductsAddCommentModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.AddComment}
            />
            <ProductsAddDocumentModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.AddDocument}
            />
            <ProductsAddTasksModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.AddTasks}
            />
            <ProductsBlockOrUnBlockModalWindow
                onClose={onClose}
                products={products}
                show={action === ProductsActions.BlockOrUnBlock}
            />
        </>
    );
};

export default ModalWindowsGroup;