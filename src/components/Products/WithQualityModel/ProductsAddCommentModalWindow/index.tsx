import {Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton, Textarea} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {IProduct} from '../../../../common/types/products';
import {ChangeEvent, useState} from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

const ProductsAddCommentModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const {t} = useTranslation('products');

    const [text, setText] = useState<string>('');

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>, value: string) => {
        setText(value);
    };

    const clear = () => setText('');

    const handleClose = () => {
        onClose();
        clear();
    };

    const handleSubmit = () => {};

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
                    <RegularButton variant="outline" size="l" onClick={handleClose}>
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
