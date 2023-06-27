import {Dropdown, DropdownItem, Grid, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import ProductsCounter from '../ProductsCounter';
import {IWithModelItem} from '../../../../common/types/withModel';
import {useState} from 'react';
import ModalWindowsGroup from '../ModalWindowsGroup';

import s from './ProductsActionsForm.module.css';

export enum ProductsActions {
    AddComment = 'AddComment',
    AddTasks = 'AddTasks',
    AddDocument = 'AddDocument',
    BlockOrUnBlock = 'BlockOrUnBlock',
}

interface Props {
    products: IWithModelItem[];
}

const ProductsActionsForm: React.FC<Props> = ({products}) => {
    const {t} = useTranslation('products');
    const [action, setAction] = useState<ProductsActions | null>(null);
    const [submitedAction, setSubmitedAction] = useState<ProductsActions | null>(null);

    const handleActionSelect = (action: string | null) => {
        const newAction = action as ProductsActions;
        setAction(prevAction => (prevAction === newAction ? null : newAction));
    };

    const isSubmitButtonDisabled = !products.length || !action;

    const handleSubmit = () => {
        setSubmitedAction(action);
    };

    const handleModalClose = () => {
        setSubmitedAction(null);
    };

    return (
        <>
            <ModalWindowsGroup onClose={handleModalClose} products={products} action={submitedAction} />
            <Grid
                className={s.grid}
                rowGap={16}
                columns="auto auto"
                justifyContent="space-between"
                alignItems="baseline"
            >
                <ProductsCounter value={products.length} />
                <Grid columns="387px 126px" columnGap={16}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('WithModels.Actions.chooseActionPlaceholder')}
                        label={t('WithModels.Actions.chooseActionLabel')}
                        value={action || undefined}
                        onSelect={handleActionSelect}
                    >
                        <DropdownItem
                            text={t('WithModels.Actions.actions.addComment')}
                            value={ProductsActions.AddComment}
                        />
                        <DropdownItem
                            text={t('WithModels.Actions.actions.addTasks')}
                            value={ProductsActions.AddTasks}
                        />
                        <DropdownItem
                            text={t('WithModels.Actions.actions.addDocument')}
                            value={ProductsActions.AddDocument}
                        />
                        <DropdownItem
                            text={t('WithModels.Actions.actions.blockOrUnBlock')}
                            value={ProductsActions.BlockOrUnBlock}
                        />
                    </Dropdown>
                    <RegularButton size="m" variant="primary" onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
                        {t('WithModels.Actions.applyAction')}
                    </RegularButton>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductsActionsForm;
