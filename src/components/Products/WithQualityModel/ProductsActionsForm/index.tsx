import {Dropdown, DropdownItem, Grid, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import ProductsCounter from '../ProductsCounter';
import {IWithModelItem} from '../../../../common/types/withModel';
import {useState} from 'react';

export enum ProductsActions {
    AddComment = 'AddComment',
    Block = 'Block',
    UnBlock = 'UnBlock',
    ResendData = 'ResendData',
    ChangeQualityStatus = 'ChangeQualityStatus',
    AddTasks = 'AddTasks',
}

interface Props {
    products: IWithModelItem[];
    onSubmit: (products: IWithModelItem[], action: ProductsActions) => void;
}

const ProductsActionsForm: React.FC<Props> = ({products, onSubmit}) => {
    const {t} = useTranslation('products');
    const [action, setAction] = useState<ProductsActions | null>(null);

    const handleActionSelect = (action: string | null) => {
        const newAction = action as ProductsActions;
        setAction(prevAction => (prevAction === newAction ? null : newAction));
    };

    const isSubmitButtonDisabled = !products.length || !action;

    const handleSubmit = () => {
        if (!isSubmitButtonDisabled) {
            onSubmit(products, action);
        }
    };

    return (
        <Grid rowGap={16} columns="auto auto" justifyContent="space-between" alignItems="baseline">
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
                    <DropdownItem text={t('WithModels.Actions.actions.block')} value={ProductsActions.Block} />
                    <DropdownItem text={t('WithModels.Actions.actions.unBlock')} value={ProductsActions.UnBlock} />
                    <DropdownItem
                        text={t('WithModels.Actions.actions.resendData')}
                        value={ProductsActions.ResendData}
                    />
                    <DropdownItem
                        text={t('WithModels.Actions.actions.changeQualityStatus')}
                        value={ProductsActions.ChangeQualityStatus}
                    />
                    <DropdownItem text={t('WithModels.Actions.actions.addTasks')} value={ProductsActions.AddTasks} />
                </Dropdown>
                <RegularButton size="m" variant="primary" onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
                    {t('WithModels.Actions.applyAction')}
                </RegularButton>
            </Grid>
        </Grid>
    );
};

export default ProductsActionsForm;
