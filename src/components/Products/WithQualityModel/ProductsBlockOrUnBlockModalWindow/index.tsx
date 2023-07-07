import {useTranslation} from 'react-i18next';
import {
    Dropdown,
    DropdownItem,
    Grid,
    Input,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    RegularButton,
} from 'fronton-react';
import {IProduct} from '../../../../common/types/products';
import {Switch, notification} from 'antd';
import {ChangeEvent, useState} from 'react';
import api from './api';

import s from './ProductsBlockOrUnBlockModalWindow.module.css';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

interface IFormState {
    buCode?: string;
    blockedForOrdering: boolean;
    blockedForSelling: boolean;
    blockedForPublication: boolean;
    blockComment?: string;
}

const buCodeValues = [9, 40];

const initFormState: IFormState = {
    blockedForOrdering: false,
    blockedForSelling: false,
    blockedForPublication: false,
};

const ProductsBlockOrUnBlockModalWindow: React.FC<Props> = ({show, onClose, products, onSubmit}) => {
    const [notificationApi] = notification.useNotification();

    const {t} = useTranslation('products');

    const [formState, setFormState] = useState<IFormState>(initFormState);

    const [updateProducts] = api.useUpdateProductsMutation();

    const handleDropDownSelect = (name: keyof IFormState) => (value: string | null) => {
        const newValue = formState[name] === value || !value ? undefined : value;
        setFormState(prevFormState => ({...prevFormState, [name]: newValue}));
    };

    const handleSwitchClick = (name: keyof IFormState) => (value: boolean) => {
        setFormState(prevFormState => ({...prevFormState, [name]: value}));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormState(prevFormState => ({...prevFormState, [name]: value}));
    };

    const isSubmitButtonDisabled = !formState.buCode || !formState.blockComment;

    const handleSubmit = () => {
        if (!formState.buCode || !formState.blockComment) return;
        const {buCode, blockComment, blockedForOrdering, blockedForPublication, blockedForSelling} = formState;
        updateProducts({
            header: {
                securityCode: 'security_code',
            },
            body: {
                updatedBy: 'Matvey',
                products: products.map(({id}) => ({
                    id,
                    quality: {
                        buCode: parseInt(buCode, 10),
                        orderBlocking: {
                            blockedForOrdering,
                            orderBlockComment: blockComment,
                        },
                        publicationBlocking: {
                            blockedForPublication,
                            publicationBlockComment: blockComment,
                        },
                        sellingBlocking: {
                            blockedForSelling,
                            sellingBlockComment: blockComment,
                        },
                    },
                })),
            },
        })
            .unwrap()
            .then(
                () => {
                    notificationApi.open({
                        message: 'Данные продуктов успешно изменены!',
                    });
                },
                () => {
                    notificationApi.open({
                        message: 'Не удалось отправить запрос. Повторите попытку позже.',
                    });
                }
            )
            .finally(() => {
                if (typeof onSubmit === 'function') {
                    onSubmit();
                }
                setFormState(initFormState);
            });
    };

    return (
        <Modal onClose={onClose} show={show} size="l">
            <ModalHeader title={t('WithModels.Actions.actions.blockOrUnBlock')} />
            <ModalContent>
                <Grid
                    columns="320px 100px 100px 100px 320px"
                    columnGap="16px"
                    alignItems="center"
                    className={s.tableHead}
                >
                    <div>{t('WithModels.blockOrUnBlockModalWindow.buCodeLabel')}</div>
                    <div>{t('WithModels.blockOrUnBlockModalWindow.blockedForOrderingLabel')}</div>
                    <div>{t('WithModels.blockOrUnBlockModalWindow.blockedForSellingLabel')}</div>
                    <div>{t('WithModels.blockOrUnBlockModalWindow.blockedForPublicationLabel')}</div>
                    <div>{t('WithModels.blockOrUnBlockModalWindow.blockCommentLabel')}</div>
                </Grid>
                <Grid
                    columns="320px 100px 100px 100px 320px"
                    columnGap="16px"
                    alignItems="center"
                    className={s.tableBody}
                >
                    <div>
                        <Dropdown
                            size="m"
                            closeOnSelect
                            placeholder="Выберите"
                            value={formState.buCode}
                            onSelect={handleDropDownSelect('buCode')}
                        >
                            {buCodeValues.map(buCode => (
                                <DropdownItem key={buCode} text={`${buCode}`} value={buCode} />
                            ))}
                        </Dropdown>
                    </div>
                    <div>
                        <Switch
                            checked={formState.blockedForOrdering}
                            onChange={handleSwitchClick('blockedForOrdering')}
                        />
                    </div>
                    <div>
                        <Switch
                            checked={formState.blockedForSelling}
                            onChange={handleSwitchClick('blockedForSelling')}
                        />
                    </div>
                    <div>
                        <Switch
                            checked={formState.blockedForPublication}
                            onChange={handleSwitchClick('blockedForPublication')}
                        />
                    </div>
                    <div>
                        <Input
                            value={formState.blockComment}
                            inputSize="m"
                            autoComplete="off"
                            name={'blockComment'}
                            placeholder=""
                            onChange={handleInputChange}
                        />
                    </div>
                </Grid>
            </ModalContent>
            <ModalFooter>
                <Grid justifyContent="right" columns="auto auto" columnGap="24px">
                    <RegularButton variant="outline" size="l">
                        {t('WithModels.blockOrUnBlockModalWindow.closeModalButton')}
                    </RegularButton>
                    <RegularButton variant="primary" size="l" disabled={isSubmitButtonDisabled} onClick={handleSubmit}>
                        {t('WithModels.blockOrUnBlockModalWindow.submitButton')}
                    </RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default ProductsBlockOrUnBlockModalWindow;
