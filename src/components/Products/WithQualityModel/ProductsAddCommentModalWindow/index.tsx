import {Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton, Textarea} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {IProduct} from '../../../../common/types/products';
import {ChangeEvent, useEffect, useState} from 'react';
import withModelApi from '../withModelApi';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

const ProductsAddCommentModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const {t} = useTranslation('products');

    const [updateProducts, {isLoading, isError, isSuccess}] = withModelApi.useUpdateProductsMutation();

    const [text, setText] = useState<string>('');

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>, value: string) => {
        setText(value);
    };

    const clear = () => setText('');

    const handleClose = () => {
        if (isLoading) return;
        onClose();
        clear();
    };

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
        if (!text) return;
        if (isError) {
            alert('Не удалось отправить запрос. Повторите попытку позже.');
        }
        if (isSuccess) {
            alert('Запрос успешно отправлен!');
        }
        handleClose();
    }, [isError, isSuccess]);

    return (
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
                    <RegularButton variant="outline" size="l" disabled={isLoading} onClick={handleClose}>
                        {t('WithModels.addCommentModalWindow.closeModalButton')}
                    </RegularButton>
                    <RegularButton variant="primary" size="l" disabled={!text} onClick={handleSubmit}>
                        {t('WithModels.addCommentModalWindow.submitButton')}
                    </RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default ProductsAddCommentModalWindow;
