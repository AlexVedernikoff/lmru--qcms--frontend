import {useEffect, useMemo, useState} from 'react';
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
import {IModalProps} from '../types';
import {notification} from 'antd';

const ApproverModal: React.FC<IModalProps> = ({isOpen, onClose, dataList}) => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const {t} = useTranslation('tasks');

    const [type, setType] = useState<string | undefined>();
    const [user, setUser] = useState<string | undefined>();

    const [updateTasks, updateTasksResult] = tasksApi.endpoints.updateTasks.useMutation();

    const isButtonDisabled = useMemo(
        () => !type || !user || updateTasksResult.isLoading,
        [type, updateTasksResult.isLoading, user]
    );

    useEffect(() => {
        if (updateTasksResult.isSuccess) {
            onClose(true);
        }

        if (updateTasksResult.isError) {
            type TDataError = {data: {errors: [{message: string}]}};
            notificationApi.open({
                message: (updateTasksResult.error as unknown as TDataError)?.data?.errors?.[0]?.message,
            });
        }
    }, [updateTasksResult.error, updateTasksResult.isError, updateTasksResult.isSuccess, onClose, notificationApi]);

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
                        approvers: [{type, externalId: user}],
                    })),
                    updatedBy: 'currentUser',
                },
            });
            onClose();
        }
    };

    return (
        <>
            {notificationContextHolder}
            <Modal show={isOpen} onClose={isButtonDisabled ? () => {} : handleClose} size="m">
                <ModalHeader title="Изменение утверждающего" />
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
                            label={'Утверждающий'}
                            name={'user'}
                            placeholder=""
                            value={user}
                            onChange={handleInput}
                        />
                    </Grid>
                </ModalContent>
                <ModalFooter>
                    <Grid columnGap={16} columns="repeat(2, 1fr)">
                        <RegularButton
                            onClick={() => {
                                onClose();
                            }}
                            size="m"
                            variant="outline"
                            disabled={isButtonDisabled}
                        >
                            {t('Buttons.Cancel')}
                        </RegularButton>

                        <RegularButton onClick={handleSave} disabled={isButtonDisabled}>
                            {t('Buttons.Save')}
                        </RegularButton>
                    </Grid>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ApproverModal;
