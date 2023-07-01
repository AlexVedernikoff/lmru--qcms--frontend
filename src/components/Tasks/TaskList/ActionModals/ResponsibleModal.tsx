import {useState} from 'react';
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
import tasksApi from '../../tasksApi';
import {TDataType} from '../types';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    dataList: TDataType[];
}

const ResponsibleModal: React.FC<IProps> = ({isOpen, onClose, dataList}) => {
    const {t} = useTranslation('tasks');

    const [type, setType] = useState<string | undefined>();
    const [user, setUser] = useState<string | undefined>();

    const [updateTasks] = tasksApi.endpoints.updateTasks.useMutation();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };
    const handleSelect = (v: string | null) => {
        setType(p => (p === v || !v ? undefined : v));
    };

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        if (type && user) {
            await updateTasks({
                header: {
                    securityCode: 'security_code',
                },
                body: {
                    qualityActions: dataList.map(v => ({
                        id: v.id,
                        actionStatus: v.actionStatus,
                        conclusion: v.conclusion,
                        responsible: [{type, externalId: user}],
                    })),
                    updatedBy: 'currentUser',
                },
            });
            onClose();
        }
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="m">
            <ModalHeader title="Изменение исполнителя" />
            <ModalContent>
                <Grid gap={24}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('TaskList.Filters.QE')}
                        value={type}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="Поставщик" value={'SUPPLIER'} />
                        <DropdownItem text="QE" value={'QE'} />
                        <DropdownItem text="SQM" value={'SQM'} />
                        <DropdownItem text="Подрядчик" value={'SERVICE_PROVIDER'} />
                    </Dropdown>

                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={'Исполнитель'}
                        name={'user'}
                        placeholder=""
                        value={user}
                        onChange={handleInput}
                    />
                </Grid>
            </ModalContent>
            <ModalFooter>
                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={onClose} size="m" variant="outline">
                        {t('Buttons.Cancel')}
                    </RegularButton>

                    <RegularButton onClick={handleSave}>{t('Buttons.Save')}</RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default ResponsibleModal;
