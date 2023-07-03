import {useTranslation} from 'react-i18next';
import {Dropdown, Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import {IProduct} from '../../../../common/types/products';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import FileUploadForm from '../../../Common/FileUploadForm';
import {useState} from 'react';

import s from './styles.module.css';

interface Props {
    show: boolean;
    onClose: () => void;
    products: IProduct[];
    onSubmit?: () => void;
}

interface FormState {
    file?: File;
}

const initialFormState: FormState = {};

const ProductsAddTasksModalWindow: React.FC<Props> = ({show, onClose, products}) => {
    const {t} = useTranslation('products');

    const [formState, setFormState] = useState<FormState>(initialFormState);

    const isSubmitButtonDisabled = !formState.file;

    const clearForm = () => setFormState(initialFormState);

    const handleClose = () => {
        onClose();
        clearForm();
    };

    const handleSubmit = () => {
        if (isSubmitButtonDisabled) return;
    };

    const handleFileSelect = (file?: File) => {
        setFormState(prevState => ({...prevState, file}));
    };

    return (
        <Modal onClose={handleClose} show={show} size="l">
            <ModalHeader title={t('WithModels.Actions.actions.addTasks')} />
            <ModalContent>
                <Grid rowGap="20px">
                    <Grid columns="1fr 1fr 1fr 1fr" columnGap="30px">
                        <Grid rowGap="20px">
                            <Dropdown label={t('WithModels.addTaskModalWindow.categoryLabel')} />
                            <Dropdown label={t('WithModels.addTaskModalWindow.documentTypeLabel')} />
                        </Grid>
                        <Grid rowGap="20px">
                            <Dropdown label={t('WithModels.addTaskModalWindow.typeLabel')} />
                            <Dropdown label={t('WithModels.addTaskModalWindow.documentsLabel')} />
                        </Grid>
                        <Grid rowGap="20px">
                            <Dropdown label={t('WithModels.addTaskModalWindow.responsiblePersonLabel')} />
                            <Dropdown label={t('WithModels.addTaskModalWindow.BULabel')} />
                        </Grid>
                        <Grid rowGap="20px">
                            <Dropdown label={t('WithModels.addTaskModalWindow.approverPersonLabel')} />
                        </Grid>
                    </Grid>
                    <hr className={s.divider} />
                    <Grid columns="1fr 1fr" columnGap="32px">
                        <Dropdown label={t('WithModels.addTaskModalWindow.lawRequirements')} />
                        <Dropdown label={t('WithModels.addTaskModalWindow.processLabel')} />
                    </Grid>
                    <CustomSwitch
                        checked={false}
                        handleChange={console.log}
                        name={t('WithModels.addTaskModalWindow.dutyLabel')}
                    />
                    <FileUploadForm onFileSelect={handleFileSelect} />
                </Grid>
            </ModalContent>
            <ModalFooter>
                <Grid justifyContent="right" columns="auto auto" columnGap="24px">
                    <RegularButton variant="outline" size="l" onClick={handleClose}>
                        {t('WithModels.addTaskModalWindow.closeModalButton')}
                    </RegularButton>
                    <RegularButton variant="primary" size="l" disabled={isSubmitButtonDisabled} onClick={handleSubmit}>
                        {t('WithModels.addTaskModalWindow.submitButton')}
                    </RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default ProductsAddTasksModalWindow;
