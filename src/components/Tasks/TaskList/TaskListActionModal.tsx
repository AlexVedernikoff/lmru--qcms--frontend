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
import tasksApi from '../tasksApi';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    dataList: unknown[];
}

const TaskListActionModal: React.FC<IProps> = ({isOpen, onClose, dataList}) => {
    const {t} = useTranslation('tasks');

    const [type, setType] = useState<string | undefined>();
    const [user, setUser] = useState<string | undefined>();

    const [updateTasks] = tasksApi.endpoints.updateTasks.useMutation();

    // const [tableData, setTableData] = useState([]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };
    const handleSelect = (v: string | null) => {
        setType(p => (p === v || !v ? undefined : v));
    };

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        updateTasks({
            header: {
                securityCode: 'security_code',
            },
            body: {
                // @ts-ignore-next-line
                qualityActions: dataList.map(v => ({...v, approvers: [{type, externalId: user}]})),
                updatedBy: 'currentUser',
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="l">
            <ModalHeader title={'Изменение утверждающего'} />
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
                        label={t('TaskList.Filters.taskStatus')}
                        name={'user'}
                        placeholder=""
                        value={user}
                        onChange={handleInput}
                    />
                </Grid>
            </ModalContent>
            <ModalFooter>
                <RegularButton onClick={handleSave}>{'Сохранить'}</RegularButton>
            </ModalFooter>
        </Modal>
    );
};

export default TaskListActionModal;
