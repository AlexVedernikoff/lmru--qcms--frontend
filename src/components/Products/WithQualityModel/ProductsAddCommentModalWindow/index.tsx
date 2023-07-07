import {Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton, Textarea} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {IProduct} from '../../../../common/types/products';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import withModelApi from '../withModelApi';
import {notification} from 'antd';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

const ProductsAddCommentModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const {t} = useTranslation('products');

    const [updateProducts, updateProductsRequestState] = withModelApi.useUpdateProductsMutation();

    const [text, setText] = useState<string>('');

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>, value: string) => {
        setText(value);
    };

    const clear = () => setText('');

    const handleClose = useCallback(() => {
        if (updateProductsRequestState.isLoading) return;
        onClose();
        clear();
    }, [updateProductsRequestState, onClose]);

    const handleSubmit = () => {
        if (!text) return;
        updateProducts({
            header: {
                securityCode: '',
            },
            body: {
                updatedBy: 'Matvey',
                products: products.map(({id}) => ({id, publicComment: text})),
            },
        });
    };

    useEffect(() => {
        if (updateProductsRequestState.isUninitialized) return;
        if (updateProductsRequestState.isError) {
            notificationApi.open({
                message: 'Не удалось отправить запрос. Повторите попытку позже.',
            });
        }
        if (updateProductsRequestState.isSuccess) {
            notificationApi.open({
                message: 'Запрос успешно отправлен!',
            });
        }
        updateProductsRequestState.reset();
        handleClose();
    }, [updateProductsRequestState, text, handleClose, notificationApi]);

    return (
        <>
            {notificationContextHolder}
            <Modal onClose={handleClose} show={show}>
                <ModalHeader title={t('WithModels.Actions.actions.addComment')} />
                <ModalContent>
                    <Textarea
                        onChange={handleTextAreaChange}
                        placeholder={t('WithModels.addCommentModalWindow.textAreaPlaceholder')}
                    />
                </ModalContent>
                <ModalFooter>
                    <Grid justifyContent="right" columns="auto auto" columnGap="24px">
                        <RegularButton
                            variant="outline"
                            size="l"
                            disabled={updateProductsRequestState.isLoading}
                            onClick={handleClose}
                        >
                            {t('WithModels.addCommentModalWindow.closeModalButton')}
                        </RegularButton>
                        <RegularButton variant="primary" size="l" disabled={!text} onClick={handleSubmit}>
                            {t('WithModels.addCommentModalWindow.submitButton')}
                        </RegularButton>
                    </Grid>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ProductsAddCommentModalWindow;
